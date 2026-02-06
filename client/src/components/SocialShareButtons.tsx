import { useState } from "react";
import { SOCIAL_PLATFORMS, handleSocialShare } from "@/lib/socialSharing";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SocialShareButtonsProps {
  title: string;
  url: string;
  description?: string;
  layout?: "horizontal" | "vertical" | "dropdown";
}

export default function SocialShareButtons({
  title,
  url,
  description,
  layout = "dropdown",
}: SocialShareButtonsProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null);

  const handleShare = (platformId: string) => {
    const platform = SOCIAL_PLATFORMS.find((p) => p.id === platformId);
    if (!platform) return;

    if (platformId === "copy-link") {
      navigator.clipboard.writeText(url);
      setCopiedPlatform(platformId);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopiedPlatform(null), 2000);
    } else {
      handleSocialShare(platform, title, url, description);
    }
    
    setShowShareMenu(false);
  };

  if (layout === "dropdown") {
    return (
      <div className="relative">
        <Button
          size="sm"
          variant="outline"
          className="text-cyan-600 hover:text-white border-cyan-200 dark:border-cyan-800 hover:bg-cyan-600 transition-colors"
          onClick={() => setShowShareMenu(!showShareMenu)}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>

        {showShareMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-10">
            {SOCIAL_PLATFORMS.map((platform, index) => {
              const Icon = platform.icon;
              const isCopied = copiedPlatform === platform.id;
              const isLastItem = index === SOCIAL_PLATFORMS.length - 1;

              return (
                <button
                  key={platform.id}
                  onClick={() => handleShare(platform.id)}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 text-slate-700 dark:text-slate-300 transition-colors ${
                    !isLastItem ? "border-b border-slate-200 dark:border-slate-700" : ""
                  } ${index === 0 ? "rounded-t-lg" : ""} ${
                    isLastItem ? "rounded-b-lg" : ""
                  }`}
                >
                  {isCopied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  {isCopied ? "Copied!" : platform.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Horizontal layout (for future use if needed)
  return (
    <div className="flex flex-wrap gap-2">
      {SOCIAL_PLATFORMS.map((platform) => {
        const Icon = platform.icon;
        return (
          <button
            key={platform.id}
            onClick={() => handleShare(platform.id)}
            title={platform.name}
            className={`p-2 rounded-lg transition-colors duration-200 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center ${platform.hoverColor}`}
            aria-label={`Share on ${platform.name}`}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
}
