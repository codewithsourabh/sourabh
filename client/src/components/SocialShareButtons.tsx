import { SOCIAL_PLATFORMS, handleSocialShare } from '@/lib/socialSharing';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface SocialShareButtonsProps {
  title: string;
  url: string;
  description?: string;
  layout?: 'horizontal' | 'vertical';
  showLabels?: boolean;
}

export default function SocialShareButtons({
  title,
  url,
  description,
  layout = 'horizontal',
  showLabels = false,
}: SocialShareButtonsProps) {
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null);

  const handleShare = (platformId: string) => {
    const platform = SOCIAL_PLATFORMS.find(p => p.id === platformId);
    if (!platform) return;

    if (platformId === 'copy-link') {
      navigator.clipboard.writeText(url);
      setCopiedPlatform(platformId);
      setTimeout(() => setCopiedPlatform(null), 2000);
    } else {
      handleSocialShare(platform, title, url, description);
    }
  };

  const containerClass = layout === 'horizontal' 
    ? 'flex flex-wrap gap-3 items-center' 
    : 'flex flex-col gap-2';

  return (
    <TooltipProvider>
      <div className={containerClass}>
        {SOCIAL_PLATFORMS.map((platform) => {
          const Icon = platform.icon;
          const isCopied = copiedPlatform === platform.id;

          return (
            <Tooltip key={platform.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleShare(platform.id)}
                  className={`
                    inline-flex items-center gap-2 px-3 py-2 rounded-lg
                    transition-all duration-300 ease-out
                    ${platform.color} ${platform.hoverColor}
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
                    dark:focus:ring-offset-gray-900
                  `}
                  aria-label={`Share on ${platform.name}`}
                >
                  {isCopied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  {showLabels && (
                    <span className="text-sm font-medium">{platform.name}</span>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {isCopied ? 'Copied!' : `Share on ${platform.name}`}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
