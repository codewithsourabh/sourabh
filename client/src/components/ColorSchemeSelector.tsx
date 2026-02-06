import { useState, useEffect } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { colorSchemes, type ColorScheme, getColorScheme, applyColorScheme } from '@/lib/colorSchemes';
import { useTheme } from '@/contexts/ThemeContext';

export default function ColorSchemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(getColorScheme());
  const { theme } = useTheme();

  useEffect(() => {
    applyColorScheme(selectedScheme);
  }, [selectedScheme]);

  const handleSelectScheme = (scheme: ColorScheme) => {
    setSelectedScheme(scheme);
    applyColorScheme(scheme);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title="Open color scheme selector"
        aria-label="Color scheme selector"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide-Right Panel */}
      <div
        className={`fixed right-0 top-0 h-screen w-80 bg-card text-card-foreground shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold">Color Schemes</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-muted rounded-md transition-colors"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Schemes List */}
        <div className="p-6 space-y-4 overflow-y-auto h-[calc(100vh-80px)]">
          {(Object.entries(colorSchemes) as [ColorScheme, typeof colorSchemes[ColorScheme]][]).map(
            ([schemeKey, schemeConfig]) => (
              <button
                key={schemeKey}
                onClick={() => handleSelectScheme(schemeKey)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left group ${
                  selectedScheme === schemeKey
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50 hover:bg-muted'
                }`}
              >
                {/* Scheme Name */}
                <div className="font-semibold mb-2 text-sm">{schemeConfig.name}</div>

                {/* Scheme Description */}
                <div className="text-xs text-muted-foreground mb-3">{schemeConfig.description}</div>

                {/* Color Preview */}
                <div className="flex gap-2">
                  <div
                    className="w-6 h-6 rounded-full border border-border"
                    style={{
                      backgroundColor: theme === 'light' ? schemeConfig.colors.light.primary : schemeConfig.colors.dark.primary,
                    }}
                    title="Primary color"
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-border"
                    style={{
                      backgroundColor: theme === 'light' ? schemeConfig.colors.light.secondary : schemeConfig.colors.dark.secondary,
                    }}
                    title="Secondary color"
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-border"
                    style={{
                      backgroundColor: theme === 'light' ? schemeConfig.colors.light.accent : schemeConfig.colors.dark.accent,
                    }}
                    title="Accent color"
                  />
                </div>

                {/* Selected Indicator */}
                {selectedScheme === schemeKey && (
                  <div className="mt-3 text-xs font-semibold text-primary">✓ Selected</div>
                )}
              </button>
            )
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
