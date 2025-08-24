import { json, type MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { Chat } from '~/components/chat/Chat.client';
import { GlassmorphismHeader } from '~/components/ui/GlassmorphismHeader';
import { ModernHero } from '~/components/ui/ModernHero';
import { ParticleSystem } from '~/components/ui/ParticleSystem';
import { ModernChatInterface } from '~/components/ui/ModernChatInterface';
import { FeaturesSection } from '~/components/ui/FeaturesSection';

export const meta: MetaFunction = () => {
  return [
    { title: 'CODO AI - Revolutionary AI Development Platform' },
    {
      name: 'description',
      content: 'Experience the future of AI-powered development with CODO AI - your intelligent coding companion',
    },
  ];
};

export const loader = () => json({});

/**
 * Modern Landing page component for CODO AI
 * Featuring glassmorphism design, particle effects, and modern hero section
 */
export default function Index() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Particle Background */}
      <ParticleSystem density={80} />

      {/* Modern Glassmorphism Header */}
      <GlassmorphismHeader />

      {/* Hero Section */}
      <ModernHero />

      {/* Features Section */}
      <FeaturesSection />

      {/* Modern Chat Interface */}
      <div className="relative z-10">
        <ClientOnly fallback={<ModernChatInterface />}>
          {() => (
            <div className="hidden">
              <Chat />
            </div>
          )}
        </ClientOnly>
        <ModernChatInterface />
      </div>
    </div>
  );
}
