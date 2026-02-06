import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SOCIAL_PLATFORMS, handleSocialShare } from '@/lib/socialSharing';

describe('Social Sharing Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('SOCIAL_PLATFORMS', () => {
    it('should have exactly 9 platforms', () => {
      expect(SOCIAL_PLATFORMS).toHaveLength(9);
    });

    it('should have all required platform properties', () => {
      SOCIAL_PLATFORMS.forEach((platform) => {
        expect(platform).toHaveProperty('id');
        expect(platform).toHaveProperty('name');
        expect(platform).toHaveProperty('icon');
        expect(platform).toHaveProperty('color');
        expect(platform).toHaveProperty('hoverColor');
        expect(platform).toHaveProperty('getShareUrl');
      });
    });

    it('should include top 9 global platforms', () => {
      const platformIds = SOCIAL_PLATFORMS.map((p) => p.id);
      expect(platformIds).toContain('facebook');
      expect(platformIds).toContain('twitter');
      expect(platformIds).toContain('linkedin');
      expect(platformIds).toContain('whatsapp');
      expect(platformIds).toContain('reddit');
      expect(platformIds).toContain('pinterest');
      expect(platformIds).toContain('telegram');
      expect(platformIds).toContain('email');
      expect(platformIds).toContain('copy-link');
    });

    it('should have unique platform IDs', () => {
      const ids = SOCIAL_PLATFORMS.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('Share URL Generation', () => {
    it('should generate correct Facebook share URL', () => {
      const facebook = SOCIAL_PLATFORMS.find((p) => p.id === 'facebook');
      const url = 'https://example.com/article';
      const shareUrl = facebook?.getShareUrl('Test Article', url);
      expect(shareUrl).toContain('facebook.com/sharer');
      expect(shareUrl).toContain(encodeURIComponent(url));
    });

    it('should generate correct Twitter share URL', () => {
      const twitter = SOCIAL_PLATFORMS.find((p) => p.id === 'twitter');
      const url = 'https://example.com/article';
      const title = 'Test Article';
      const shareUrl = twitter?.getShareUrl(title, url);
      expect(shareUrl).toContain('twitter.com/intent/tweet');
      expect(shareUrl).toContain(encodeURIComponent(url));
      expect(shareUrl).toContain(encodeURIComponent(title));
    });

    it('should generate correct LinkedIn share URL', () => {
      const linkedin = SOCIAL_PLATFORMS.find((p) => p.id === 'linkedin');
      const url = 'https://example.com/article';
      const shareUrl = linkedin?.getShareUrl('Test Article', url);
      expect(shareUrl).toContain('linkedin.com/sharing');
      expect(shareUrl).toContain(encodeURIComponent(url));
    });

    it('should generate correct WhatsApp share URL', () => {
      const whatsapp = SOCIAL_PLATFORMS.find((p) => p.id === 'whatsapp');
      const url = 'https://example.com/article';
      const title = 'Test Article';
      const shareUrl = whatsapp?.getShareUrl(title, url);
      expect(shareUrl).toContain('wa.me');
      expect(shareUrl).toContain(encodeURIComponent(title));
      expect(shareUrl).toContain(encodeURIComponent(url));
    });

    it('should generate correct Reddit share URL', () => {
      const reddit = SOCIAL_PLATFORMS.find((p) => p.id === 'reddit');
      const url = 'https://example.com/article';
      const title = 'Test Article';
      const shareUrl = reddit?.getShareUrl(title, url);
      expect(shareUrl).toContain('reddit.com/submit');
      expect(shareUrl).toContain(encodeURIComponent(url));
      expect(shareUrl).toContain(encodeURIComponent(title));
    });

    it('should generate correct Pinterest share URL', () => {
      const pinterest = SOCIAL_PLATFORMS.find((p) => p.id === 'pinterest');
      const url = 'https://example.com/article';
      const title = 'Test Article';
      const description = 'Test Description';
      const shareUrl = pinterest?.getShareUrl(title, url, description);
      expect(shareUrl).toContain('pinterest.com/pin/create');
      expect(shareUrl).toContain(encodeURIComponent(url));
      expect(shareUrl).toContain(encodeURIComponent(description));
    });

    it('should generate correct Telegram share URL', () => {
      const telegram = SOCIAL_PLATFORMS.find((p) => p.id === 'telegram');
      const url = 'https://example.com/article';
      const title = 'Test Article';
      const shareUrl = telegram?.getShareUrl(title, url);
      expect(shareUrl).toContain('t.me/share/url');
      expect(shareUrl).toContain(encodeURIComponent(url));
      expect(shareUrl).toContain(encodeURIComponent(title));
    });

    it('should generate correct Email share URL', () => {
      const email = SOCIAL_PLATFORMS.find((p) => p.id === 'email');
      const url = 'https://example.com/article';
      const title = 'Test Article';
      const shareUrl = email?.getShareUrl(title, url);
      expect(shareUrl).toContain('mailto:');
      expect(shareUrl).toContain(encodeURIComponent(title));
      expect(shareUrl).toContain(encodeURIComponent(url));
    });

    it('should handle special characters in URLs and titles', () => {
      const facebook = SOCIAL_PLATFORMS.find((p) => p.id === 'facebook');
      const url = 'https://example.com/article?id=123&lang=en';
      const title = 'Test Article & More!';
      const shareUrl = facebook?.getShareUrl(title, url);
      expect(shareUrl).toContain(encodeURIComponent(url));
    });
  });

  describe('handleSocialShare', () => {
    it('should open window for non-copy-link platforms', () => {
      const windowOpenSpy = vi.spyOn(window, 'open').mockReturnValue(null);
      const facebook = SOCIAL_PLATFORMS.find((p) => p.id === 'facebook');

      if (facebook) {
        handleSocialShare(facebook, 'Test', 'https://example.com');
        expect(windowOpenSpy).toHaveBeenCalled();
      }

      windowOpenSpy.mockRestore();
    });

    it('should pass correct window dimensions', () => {
      const windowOpenSpy = vi.spyOn(window, 'open').mockReturnValue(null);
      const twitter = SOCIAL_PLATFORMS.find((p) => p.id === 'twitter');

      if (twitter) {
        handleSocialShare(twitter, 'Test Article', 'https://example.com');
        const callArgs = windowOpenSpy.mock.calls[0];
        expect(callArgs[2]).toContain('width=600');
        expect(callArgs[2]).toContain('height=400');
      }

      windowOpenSpy.mockRestore();
    });
  });

  describe('Platform Colors and Styling', () => {
    it('should have valid color classes', () => {
      const colorClasses = ['text-blue-600', 'text-black dark:text-white', 'text-blue-700', 'text-green-500', 'text-orange-600', 'text-red-600', 'text-blue-400', 'text-gray-600', 'text-cyan-600'];
      SOCIAL_PLATFORMS.forEach((platform) => {
        expect(colorClasses).toContain(platform.color);
      });
    });

    it('should have valid hover color classes', () => {
      SOCIAL_PLATFORMS.forEach((platform) => {
        expect(platform.hoverColor).toMatch(/^hover:text-/);
      });
    });
  });
});
