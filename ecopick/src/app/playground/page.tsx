"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCounterStore } from "@/lib/store";
import {
  Sparkles,
  Zap,
  Send,
  Plus,
  Minus,
  RotateCcw,
  Heart,
  Star,
  Bell,
  Settings,
  User,
  Mail,
  Lock,
  Check,
  X,
  ArrowLeft,
  Palette,
  Component,
  MousePointer,
} from "lucide-react";
import Link from "next/link";

// shadcn/ui 컴포넌트
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Zod 스키마 - 폼 검증용
const formSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
});

type FormData = z.infer<typeof formSchema>;

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">라이브러리 Playground</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <Tabs defaultValue="shadcn" className="space-y-8">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
            <TabsTrigger value="shadcn">shadcn/ui</TabsTrigger>
            <TabsTrigger value="framer">Framer Motion</TabsTrigger>
            <TabsTrigger value="zustand">Zustand</TabsTrigger>
            <TabsTrigger value="form">Form + Zod</TabsTrigger>
            <TabsTrigger value="icons">Lucide Icons</TabsTrigger>
            <TabsTrigger value="reactbits">React Bits</TabsTrigger>
          </TabsList>

          {/* shadcn/ui */}
          <TabsContent value="shadcn">
            <ShadcnSection />
          </TabsContent>

          {/* Framer Motion */}
          <TabsContent value="framer">
            <FramerMotionSection />
          </TabsContent>

          {/* Zustand */}
          <TabsContent value="zustand">
            <ZustandSection />
          </TabsContent>

          {/* React Hook Form + Zod */}
          <TabsContent value="form">
            <FormSection />
          </TabsContent>

          {/* Lucide Icons */}
          <TabsContent value="icons">
            <IconsSection />
          </TabsContent>

          {/* React Bits 스타일 */}
          <TabsContent value="reactbits">
            <ReactBitsSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// shadcn/ui 테스트 섹션
function ShadcnSection() {
  const [switchOn, setSwitchOn] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Component className="w-5 h-5 text-primary" />
          shadcn/ui
        </CardTitle>
        <CardDescription>재사용 가능한 UI 컴포넌트 라이브러리</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* 버튼 */}
        <div>
          <h3 className="text-sm font-medium mb-3">Button</h3>
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* 배지 */}
        <div>
          <h3 className="text-sm font-medium mb-3">Badge</h3>
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>

        {/* 인풋 */}
        <div>
          <h3 className="text-sm font-medium mb-3">Input</h3>
          <div className="flex gap-3 max-w-md">
            <Input placeholder="이메일 입력..." />
            <Button>확인</Button>
          </div>
        </div>

        {/* 스위치 & 슬라이더 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Switch</h3>
            <div className="flex items-center gap-3">
              <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
              <span className="text-sm text-muted-foreground">
                {switchOn ? "켜짐" : "꺼짐"}
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Slider: {sliderValue[0]}%</h3>
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              max={100}
              step={1}
            />
          </div>
        </div>

        {/* 다이얼로그 */}
        <div>
          <h3 className="text-sm font-medium mb-3">Dialog</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">다이얼로그 열기</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>다이얼로그 제목</DialogTitle>
                <DialogDescription>
                  shadcn/ui의 Dialog 컴포넌트입니다. 모달 창을 쉽게 만들 수 있어요.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input placeholder="내용을 입력하세요..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">취소</Button>
                <Button>확인</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

// Framer Motion 테스트 섹션
function FramerMotionSection() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Framer Motion
        </CardTitle>
        <CardDescription>React 애니메이션 라이브러리</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* 토글 애니메이션 */}
        <div>
          <h3 className="text-sm font-medium mb-3">Fade In/Out</h3>
          <Button
            onClick={() => setIsVisible(!isVisible)}
            variant="outline"
            className="mb-4"
          >
            {isVisible ? "숨기기" : "보이기"}
          </Button>

          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-muted rounded-xl"
              >
                <p>이 박스는 부드럽게 나타나고 사라집니다.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 호버 애니메이션 */}
        <div>
          <h3 className="text-sm font-medium mb-3">Hover & Tap</h3>
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold cursor-pointer"
              >
                {i}
              </motion.div>
            ))}
          </div>
        </div>

        {/* 드래그 */}
        <div>
          <h3 className="text-sm font-medium mb-3">Drag</h3>
          <div className="h-24 relative">
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 250, top: 0, bottom: 50 }}
              className="w-20 h-20 bg-gradient-to-br from-primary to-blue-400 rounded-2xl flex items-center justify-center text-white cursor-grab active:cursor-grabbing absolute"
            >
              <Zap className="w-8 h-8" />
            </motion.div>
          </div>
        </div>

        {/* 스태거 애니메이션 */}
        <div>
          <h3 className="text-sm font-medium mb-3">Stagger Animation</h3>
          <motion.div
            className="flex gap-2"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {["안", "녕", "하", "세", "요"].map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}

// Zustand 테스트 섹션
function ZustandSection() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Zustand
        </CardTitle>
        <CardDescription>간단하고 빠른 상태관리 라이브러리</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center py-8">
          <p className="text-sm text-muted-foreground mb-6">전역 상태 카운터</p>

          <div className="flex items-center gap-6">
            <Button
              variant="outline"
              size="icon"
              onClick={decrement}
              className="w-12 h-12 rounded-full"
            >
              <Minus className="w-5 h-5" />
            </Button>

            <motion.div
              key={count}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-6xl font-bold text-primary w-32 text-center"
            >
              {count}
            </motion.div>

            <Button
              variant="outline"
              size="icon"
              onClick={increment}
              className="w-12 h-12 rounded-full"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          <Button variant="ghost" onClick={reset} className="mt-6">
            <RotateCcw className="w-4 h-4 mr-2" />
            초기화
          </Button>

          <div className="mt-8 p-4 bg-muted rounded-lg text-sm text-muted-foreground max-w-md">
            <p className="font-mono">
              {`const { count, increment } = useCounterStore();`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// React Hook Form + Zod 테스트 섹션
function FormSection() {
  const [submitResult, setSubmitResult] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitResult(`이메일: ${data.email}`);
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5 text-primary" />
          React Hook Form + Zod
        </CardTitle>
        <CardDescription>폼 관리 및 스키마 검증</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
          {/* 이메일 */}
          <div>
            <label className="text-sm font-medium mb-1 block">이메일</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                {...register("email")}
                className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                placeholder="example@email.com"
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-sm mt-1 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                {errors.email.message}
              </motion.p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="text-sm font-medium mb-1 block">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                {...register("password")}
                className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                placeholder="8자 이상 입력"
              />
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-sm mt-1 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                {errors.password.message}
              </motion.p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RotateCcw className="w-4 h-4" />
              </motion.div>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                제출하기
              </>
            )}
          </Button>

          <AnimatePresence>
            {submitResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 bg-green-50 text-green-700 rounded-lg text-sm"
              >
                제출 완료! {submitResult}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </CardContent>
    </Card>
  );
}

// Lucide Icons 테스트 섹션
function IconsSection() {
  const icons = [
    { Icon: Heart, name: "Heart" },
    { Icon: Star, name: "Star" },
    { Icon: Bell, name: "Bell" },
    { Icon: Settings, name: "Settings" },
    { Icon: User, name: "User" },
    { Icon: Mail, name: "Mail" },
    { Icon: Lock, name: "Lock" },
    { Icon: Zap, name: "Zap" },
    { Icon: Sparkles, name: "Sparkles" },
    { Icon: Send, name: "Send" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-primary" />
          Lucide Icons
        </CardTitle>
        <CardDescription>깔끔한 오픈소스 아이콘 라이브러리</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          {icons.map(({ Icon, name }) => (
            <motion.div
              key={name}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted cursor-pointer transition-colors"
            >
              <Icon className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{name}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-xl">
          <p className="text-sm text-muted-foreground mb-2">포인트 색상 적용:</p>
          <div className="flex gap-3">
            <Heart className="w-6 h-6 text-primary" />
            <Star className="w-6 h-6 text-primary" />
            <Bell className="w-6 h-6 text-primary" />
            <Zap className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// React Bits 스타일 애니메이션 섹션
function ReactBitsSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MousePointer className="w-5 h-5 text-primary" />
          React Bits 스타일
        </CardTitle>
        <CardDescription>인터랙티브 애니메이션 효과 (코드 복사 방식)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* 글로우 버튼 */}
        <div>
          <h3 className="text-sm font-medium mb-3">Glow Button</h3>
          <motion.button
            className="relative px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "100%" : "-100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">Hover Me</span>
          </motion.button>
        </div>

        {/* 마그네틱 버튼 */}
        <div>
          <h3 className="text-sm font-medium mb-3">Magnetic Effect</h3>
          <MagneticButton>
            <div className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium">
              마우스를 가까이
            </div>
          </MagneticButton>
        </div>

        {/* 텍스트 스크램블 */}
        <div>
          <h3 className="text-sm font-medium mb-3">Text Reveal</h3>
          <TextReveal text="Hello, World!" />
        </div>

        {/* 물결 효과 버튼 */}
        <div>
          <h3 className="text-sm font-medium mb-3">Ripple Effect</h3>
          <RippleButton>클릭하세요</RippleButton>
        </div>

        {/* 플로팅 카드 */}
        <div>
          <h3 className="text-sm font-medium mb-3">Floating Card</h3>
          <motion.div
            className="w-48 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center cursor-pointer border border-primary/20"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
        </div>

        {/* 그라데이션 보더 */}
        <div>
          <h3 className="text-sm font-medium mb-3">Gradient Border</h3>
          <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 inline-block">
            <div className="px-6 py-3 bg-background rounded-[10px]">
              그라데이션 보더
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 마그네틱 버튼 컴포넌트
function MagneticButton({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="inline-block cursor-pointer"
    >
      {children}
    </motion.div>
  );
}

// 텍스트 리빌 컴포넌트
function TextReveal({ text }: { text: string }) {
  return (
    <motion.div
      className="text-2xl font-bold"
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: i * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

// 물결 효과 버튼 컴포넌트
function RippleButton({ children }: { children: React.ReactNode }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return (
    <button
      onClick={handleClick}
      className="relative px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium overflow-hidden"
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full"
          initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y, opacity: 1 }}
          animate={{ width: 200, height: 200, x: ripple.x - 100, y: ripple.y - 100, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
