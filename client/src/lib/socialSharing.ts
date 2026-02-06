import { Facebook, Twitter, Linkedin, Mail, MessageCircle, Send, Bookmark, Copy } from 'lucide-react';

export interface SocialPlatform {
  id: string;
  name: string;
  icon: typeof Facebook;
  color: string;
  hoverColor: string;
  getShareUrl: (title: string, url: string, description?: string) => string;
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'text-blue-600',
    hoverColor: 'hover:text-blue-700',
    getShareUrl: (title, url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: Twitter,
    color: 'text-black dark:text-white',
    hoverColor: 'hover:text-gray-700 dark:hover:text-gray-300',
    getShareUrl: (title, url) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'text-blue-700',
    hoverColor: 'hover:text-blue-800',
    getShareUrl: (title, url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: MessageCircle,
    color: 'text-green-500',
    hoverColor: 'hover:text-green-600',
    getShareUrl: (title, url) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    id: 'reddit',
    name: 'Reddit',
    icon: MessageCircle,
    color: 'text-orange-600',
    hoverColor: 'hover:text-orange-700',
    getShareUrl: (title, url) => `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: Bookmark,
    color: 'text-red-600',
    hoverColor: 'hover:text-red-700',
    getShareUrl: (title, url, description) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description || title)}`,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: Send,
    color: 'text-blue-400',
    hoverColor: 'hover:text-blue-500',
    getShareUrl: (title, url) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    color: 'text-gray-600',
    hoverColor: 'hover:text-gray-700',
    getShareUrl: (title, url) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`,
  },
  {
    id: 'copy-link',
    name: 'Copy Link',
    icon: Copy,
    color: 'text-cyan-600',
    hoverColor: 'hover:text-cyan-700',
    getShareUrl: (title, url) => url,
  },
];

export const handleSocialShare = (platform: SocialPlatform, title: string, url: string, description?: string) => {
  if (platform.id === 'copy-link') {
    navigator.clipboard.writeText(url);
    return;
  }

  const shareUrl = platform.getShareUrl(title, url, description);
  window.open(shareUrl, '_blank', 'width=600,height=400');
};
