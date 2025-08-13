import type { Preview } from "@storybook/react";
import "../app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen bg-background text-foreground p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: { expanded: true },
    layout: "centered",
  },
};

export default preview;


