import {
  Sparkles,
  Zap,
  FileText,
  Terminal,
  ArrowRight,
  Github
} from "lucide-react";
import { siteConfig, features, commands } from "@/config/site";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <header className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* 배지 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 mb-8">
            <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
            <span>Claude Code 최적화 템플릿</span>
          </div>

          {/* 메인 타이틀 */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {siteConfig.name}
          </h1>

          {/* 설명 */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {siteConfig.description}
            <br />
            <span className="text-gray-400">
              Next.js + TypeScript + Tailwind CSS
            </span>
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/playground"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-5 h-5" />
              라이브러리 테스트
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              자세히 알아보기
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* 기능 섹션 */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            주요 기능
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={getFeatureIcon(index)}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 커맨드 섹션 */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            사용 가능한 커맨드
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Claude Code에서 바로 사용할 수 있는 커스텀 명령어
          </p>

          <div className="bg-gray-900 rounded-2xl p-6 md:p-8">
            <div className="space-y-4">
              {commands.map((cmd, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 text-gray-300"
                >
                  <code className="text-[var(--color-primary)] font-mono">
                    {cmd.name}
                  </code>
                  <span className="text-gray-500">→</span>
                  <span>{cmd.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center text-gray-400 text-sm">
          <p>
            Made with Claude Code
          </p>
        </div>
      </footer>
    </div>
  );
}

// 기능 카드 컴포넌트
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-4 text-[var(--color-primary)]">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

// 기능별 아이콘 반환
function getFeatureIcon(index: number) {
  const icons = [
    <Zap key="zap" className="w-5 h-5" />,
    <Terminal key="terminal" className="w-5 h-5" />,
    <FileText key="file" className="w-5 h-5" />,
    <Sparkles key="sparkles" className="w-5 h-5" />,
  ];
  return icons[index] || icons[0];
}
