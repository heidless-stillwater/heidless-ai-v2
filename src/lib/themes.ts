export type ThemeMode = 'light' | 'dark';
export type ThemeCategory = 'bespokeThemes' | 'primaryColorsThemes' | 'daisyUIThemes' | 'greyscaleThemes' | 'customThemes';

export interface ThemeDefinition {
  name: string;
  category: ThemeCategory;
  symbol?: string;
  swatchColor?: string;
  light: { [key: string]: string };
  dark: { [key: string]: string };
}

export const defaultTheme = {
    name: 'CoachSync Green',
    mode: 'light' as ThemeMode,
    category: 'bespokeThemes' as ThemeCategory
};

export const bespokeThemes: ThemeDefinition[] = [
  {
    name: 'CoachSync Green',
    category: 'bespokeThemes',
    swatchColor: '145 63% 49%',
    light: { '--background': '135 100% 97%', '--foreground': '240 10% 3.9%', '--card': '0 0% 100%', '--card-foreground': '240 10% 3.9%', '--popover': '0 0% 100%', '--popover-foreground': '240 10% 3.9%', '--primary': '145 63% 49%', '--primary-foreground': '145 50% 98%', '--secondary': '240 4.8% 95.9%', '--secondary-foreground': '240 5.9% 10%', '--muted': '240 4.8% 95.9%', '--muted-foreground': '240 3.8% 46.1%', '--accent': '207 70% 53%', '--accent-foreground': '0 0% 98%', '--destructive': '0 84.2% 60.2%', '--destructive-foreground': '0 0% 98%', '--border': '240 5.9% 90%', '--input': '240 5.9% 90%', '--ring': '145 63% 49%', },
    dark: { '--background': '240 10% 3.9%', '--foreground': '0 0% 98%', '--card': '240 10% 3.9%', '--card-foreground': '0 0% 98%', '--popover': '240 10% 3.9%', '--popover-foreground': '0 0% 98%', '--primary': '145 63% 49%', '--primary-foreground': '145 50% 98%', '--secondary': '240 3.7% 15.9%', '--secondary-foreground': '0 0% 98%', '--muted': '240 3.7% 15.9%', '--muted-foreground': '240 5% 64.9%', '--accent': '207 70% 53%', '--accent-foreground': '0 0% 98%', '--destructive': '0 62.8% 30.6%', '--destructive-foreground': '0 0% 98%', '--border': '240 3.7% 15.9%', '--input': '240 3.7% 15.9%', '--ring': '145 63% 49%', },
  },
  {
    name: 'Ruby & Sky',
    category: 'bespokeThemes',
    swatchColor: '197 71% 73%',
    light: { '--background': '180 50% 99%', '--foreground': '0 0% 27%', '--card': '0 0% 100%', '--card-foreground': '0 0% 27%', '--popover': '0 0% 100%', '--popover-foreground': '0 0% 27%', '--primary': '197 71% 73%', '--primary-foreground': '0 0% 27%', '--secondary': '0 0% 75%', '--secondary-foreground': '0 0% 27%', '--muted': '0 0% 75%', '--muted-foreground': '0 0% 40%', '--accent': '350 100% 88%', '--accent-foreground': '0 0% 27%', '--destructive': '9 100% 64%', '--destructive-foreground': '0 0% 100%', '--border': '0 0% 75%', '--input': '0 0% 75%', '--ring': '197 71% 73%', },
    dark: { '--background': '0 0% 10%', '--foreground': '0 0% 90%', '--card': '0 0% 12%', '--card-foreground': '0 0% 90%', '--popover': '0 0% 12%', '--popover-foreground': '0 0% 90%', '--primary': '197 71% 73%', '--primary-foreground': '0 0% 10%', '--secondary': '0 0% 30%', '--secondary-foreground': '0 0% 90%', '--muted': '0 0% 30%', '--muted-foreground': '0 0% 60%', '--accent': '350 100% 88%', '--accent-foreground': '0 0% 10%', '--destructive': '9 100% 64%', '--destructive-foreground': '0 0% 100%', '--border': '0 0% 30%', '--input': '0 0% 30%', '--ring': '197 71% 73%', },
  },
  {
    name: 'Coolish Slate',
    category: 'bespokeThemes',
    swatchColor: '248 80% 66%',
    light: { '--background': '212 22% 95%', '--foreground': '212 25% 22%', '--card': '0 0% 100%', '--card-foreground': '212 25% 22%', '--popover': '0 0% 100%', '--popover-foreground': '212 25% 22%', '--primary': '248 80% 66%', '--primary-foreground': '0 0% 100%', '--secondary': '211 15% 69%', '--secondary-foreground': '212 25% 22%', '--muted': '211 15% 69%', '--muted-foreground': '211 15% 49%', '--accent': '181 100% 41%', '--accent-foreground': '0 0% 100%', '--destructive': '0 84.2% 60.2%', '--destructive-foreground': '0 0% 98%', '--border': '211 15% 69%', '--input': '211 15% 69%', '--ring': '248 80% 66%', },
    dark: { '--background': '212 22% 15%', '--foreground': '212 22% 85%', '--card': '212 22% 20%', '--card-foreground': '212 22% 85%', '--popover': '212 22% 20%', '--popover-foreground': '212 22% 85%', '--primary': '248 80% 76%', '--primary-foreground': '212 22% 15%', '--secondary': '211 15% 50%', '--secondary-foreground': '212 22% 85%', '--muted': '211 15% 50%', '--muted-foreground': '211 15% 70%', '--accent': '181 100% 51%', '--accent-foreground': '212 22% 15%', '--destructive': '0 84.2% 60.2%', '--destructive-foreground': '0 0% 98%', '--border': '211 15% 50%', '--input': '211 15% 50%', '--ring': '248 80% 76%', },
  },
  {
    name: 'Fuchsia & Cyan',
    category: 'bespokeThemes',
    swatchColor: '330 100% 50%',
    light: { '--background': '0 0% 96%', '--foreground': '0 0% 4%', '--card': '0 0% 88%', '--card-foreground': '0 0% 4%', '--popover': '0 0% 88%', '--popover-foreground': '0 0% 4%', '--primary': '330 100% 50%', '--primary-foreground': '0 0% 96%', '--secondary': '0 0% 50%', '--secondary-foreground': '0 0% 96%', '--muted': '0 0% 50%', '--muted-foreground': '0 0% 40%', '--accent': '180 100% 50%', '--accent-foreground': '0 0% 4%', '--destructive': '0 100% 60%', '--destructive-foreground': '0 0% 96%', '--border': '0 0% 50%', '--input': '0 0% 50%', '--ring': '330 100% 50%', },
    dark: { '--background': '0 0% 4%', '--foreground': '0 0% 96%', '--card': '0 0% 12%', '--card-foreground': '0 0% 96%', '--popover': '0 0% 12%', '--popover-foreground': '0 0% 96%', '--primary': '330 100% 50%', '--primary-foreground': '0 0% 96%', '--secondary': '0 0% 50%', '--secondary-foreground': '0 0% 96%', '--muted': '0 0% 50%', '--muted-foreground': '0 0% 60%', '--accent': '180 100% 50%', '--accent-foreground': '0 0% 4%', '--destructive': '0 100% 60%', '--destructive-foreground': '0 0% 96%', '--border': '0 0% 50%', '--input': '0 0% 50%', '--ring': '330 100% 50%', },
  },
  {
    name: 'Indigo & Amber',
    category: 'bespokeThemes',
    swatchColor: '211 78% 46%',
    light: { '--background': '231 48% 94%', '--foreground': '0 0% 13%', '--card': '0 0% 100%', '--card-foreground': '0 0% 13%', '--popover': '0 0% 100%', '--popover-foreground': '0 0% 13%', '--primary': '211 78% 46%', '--primary-foreground': '0 0% 100%', '--secondary': '0 0% 62%', '--secondary-foreground': '0 0% 13%', '--muted': '0 0% 62%', '--muted-foreground': '0 0% 40%', '--accent': '45 100% 51%', '--accent-foreground': '0 0% 13%', '--destructive': '0 65% 51%', '--destructive-foreground': '0 0% 100%', '--border': '0 0% 62%', '--input': '0 0% 62%', '--ring': '211 78% 46%', },
    dark: { '--background': '0 0% 13%', '--foreground': '231 48% 94%', '--card': '0 0% 10%', '--card-foreground': '231 48% 94%', '--popover': '0 0% 10%', '--popover-foreground': '231 48% 94%', '--primary': '211 78% 66%', '--primary-foreground': '0 0% 13%', '--secondary': '0 0% 30%', '--secondary-foreground': '231 48% 94%', '--muted': '0 0% 30%', '--muted-foreground': '0 0% 70%', '--accent': '45 100% 51%', '--accent-foreground': '0 0% 13%', '--destructive': '0 62.8% 30.6%', '--destructive-foreground': '0 0% 98%', '--border': '0 0% 30%', '--input': '0 0% 30%', '--ring': '211 78% 66%', },
  },
  {
    name: 'Indigo Night',
    category: 'bespokeThemes',
    swatchColor: '271 76% 53%',
    light: { '--background': '220 100% 96%', '--foreground': '240 14% 15%', '--card': '220 50% 99%', '--card-foreground': '240 14% 15%', '--popover': '220 50% 99%', '--popover-foreground': '240 14% 15%', '--primary': '271 76% 53%', '--primary-foreground': '220 100% 96%', '--secondary': '263 47% 51%', '--secondary-foreground': '220 100% 96%', '--muted': '263 47% 51%', '--muted-foreground': '240 4% 68%', '--accent': '180 100% 50%', '--accent-foreground': '220 100% 96%', '--destructive': '11 100% 62%', '--destructive-foreground': '220 100% 96%', '--border': '263 47% 51%', '--input': '263 47% 51%', '--ring': '271 76% 53%', },
    dark: { '--background': '240 14% 15%', '--foreground': '220 100% 96%', '--card': '240 11% 20%', '--card-foreground': '220 100% 96%', '--popover': '240 11% 20%', '--popover-foreground': '220 100% 96%', '--primary': '271 76% 53%', '--primary-foreground': '220 100% 96%', '--secondary': '263 47% 51%', '--secondary-foreground': '220 100% 96%', '--muted': '263 47% 51%', '--muted-foreground': '240 4% 68%', '--accent': '180 100% 50%', '--accent-foreground': '220 100% 96%', '--destructive': '11 100% 62%', '--destructive-foreground': '220 100% 96%', '--border': '263 47% 51%', '--input': '263 47% 51%', '--ring': '271 76% 53%', },
  },
  {
    name: 'Emerald Isle',
    category: 'bespokeThemes',
    swatchColor: '134 61% 40%',
    light: { '--background': '120 100% 98%', '--foreground': '210 10% 23%', '--card': '0 0% 100%', '--card-foreground': '210 10% 23%', '--popover': '0 0% 100%', '--popover-foreground': '210 10% 23%', '--primary': '134 61% 40%', '--primary-foreground': '0 0% 100%', '--secondary': '208 7% 48%', '--secondary-foreground': '0 0% 100%', '--muted': '208 7% 48%', '--muted-foreground': '208 7% 30%', '--accent': '211 100% 50%', '--accent-foreground': '0 0% 100%', '--destructive': '354 70% 54%', '--destructive-foreground': '0 0% 100%', '--border': '208 7% 48%', '--input': '208 7% 48%', '--ring': '134 61% 40%', },
    dark: { '--background': '210 10% 15%', '--foreground': '120 100% 98%', '--card': '210 10% 20%', '--card-foreground': '120 100% 98%', '--popover': '210 10% 20%', '--popover-foreground': '120 100% 98%', '--primary': '134 61% 50%', '--primary-foreground': '0 0% 100%', '--secondary': '208 7% 35%', '--secondary-foreground': '0 0% 100%', '--muted': '208 7% 35%', '--muted-foreground': '208 7% 60%', '--accent': '211 100% 60%', '--accent-foreground': '0 0% 100%', '--destructive': '354 70% 54%', '--destructive-foreground': '0 0% 100%', '--border': '208 7% 35%', '--input': '208 7% 35%', '--ring': '134 61% 50%', },
  },
];

export const primaryColorsThemes: ThemeDefinition[] = [
    { name: 'Red', category: 'primaryColorsThemes', light: { '--primary': '0 72% 51%', '--accent': '0 86% 97%' }, dark: { '--primary': '0 72% 51%', '--accent': '0 86% 15%' } },
    { name: 'Orange', category: 'primaryColorsThemes', light: { '--primary': '25 95% 53%', '--accent': '25 86% 97%' }, dark: { '--primary': '25 95% 53%', '--accent': '25 86% 15%' } },
    { name: 'Amber', category: 'primaryColorsThemes', light: { '--primary': '45 93% 47%', '--accent': '45 86% 97%' }, dark: { '--primary': '45 93% 47%', '--accent': '45 86% 15%' } },
    { name: 'Yellow', category: 'primaryColorsThemes', light: { '--primary': '54 96% 50%', '--accent': '54 86% 97%' }, dark: { '--primary': '54 96% 50%', '--accent': '54 86% 15%' } },
    { name: 'Lime', category: 'primaryColorsThemes', light: { '--primary': '84 79% 44%', '--accent': '84 86% 97%' }, dark: { '--primary': '84 79% 44%', '--accent': '84 86% 15%' } },
    { name: 'Green', category: 'primaryColorsThemes', light: { '--primary': '142 76% 36%', '--accent': '142 86% 97%' }, dark: { '--primary': '142 76% 36%', '--accent': '142 86% 15%' } },
    { name: 'Emerald', category: 'primaryColorsThemes', light: { '--primary': '158 79% 41%', '--accent': '158 86% 97%' }, dark: { '--primary': '158 79% 41%', '--accent': '158 86% 15%' } },
    { name: 'Teal', category: 'primaryColorsThemes', light: { '--primary': '173 80% 40%', '--accent': '173 86% 97%' }, dark: { '--primary': '173 80% 40%', '--accent': '173 86% 15%' } },
    { name: 'Cyan', category: 'primaryColorsThemes', light: { '--primary': '190 95% 48%', '--accent': '190 86% 97%' }, dark: { '--primary': '190 95% 48%', '--accent': '190 86% 15%' } },
    { name: 'Sky', category: 'primaryColorsThemes', light: { '--primary': '199 98% 52%', '--accent': '199 86% 97%' }, dark: { '--primary': '199 98% 52%', '--accent': '199 86% 15%' } },
    { name: 'Blue', category: 'primaryColorsThemes', light: { '--primary': '217 91% 60%', '--accent': '217 86% 97%' }, dark: { '--primary': '217 91% 60%', '--accent': '217 86% 15%' } },
    { name: 'Indigo', category: 'primaryColorsThemes', light: { '--primary': '239 84% 67%', '--accent': '239 86% 97%' }, dark: { '--primary': '239 84% 67%', '--accent': '239 86% 15%' } },
    { name: 'Violet', category: 'primaryColorsThemes', light: { '--primary': '259 93% 68%', '--accent': '259 86% 97%' }, dark: { '--primary': '259 93% 68%', '--accent': '259 86% 15%' } },
    { name: 'Purple', category: 'primaryColorsThemes', light: { '--primary': '271 91% 65%', '--accent': '271 86% 97%' }, dark: { '--primary': '271 91% 65%', '--accent': '271 86% 15%' } },
    { name: 'Fuchsia', category: 'primaryColorsThemes', light: { '--primary': '291 89% 65%', '--accent': '291 86% 97%' }, dark: { '--primary': '291 89% 65%', '--accent': '291 86% 15%' } },
    { name: 'Pink', category: 'primaryColorsThemes', light: { '--primary': '322 95% 61%', '--accent': '322 86% 97%' }, dark: { '--primary': '322 95% 61%', '--accent': '322 86% 15%' } },
    { name: 'Rose', category: 'primaryColorsThemes', light: { '--primary': '341 96% 61%', '--accent': '341 86% 97%' }, dark: { '--primary': '341 96% 61%', '--accent': '341 86% 15%' } },
];

export const daisyUIThemes: ThemeDefinition[] = [
  { name: 'Cupcake', category: 'daisyUIThemes', light: { '--primary': '335 60% 50%', '--accent': '335 60% 95%' }, dark: { '--primary': '335 60% 50%', '--accent': '335 60% 15%' } },
  { name: 'Bumblebee', category: 'daisyUIThemes', light: { '--primary': '43 96% 56%', '--accent': '43 96% 95%' }, dark: { '--primary': '43 96% 56%', '--accent': '43 96% 15%' } },
  { name: 'Corporate', category: 'daisyUIThemes', light: { '--primary': '215 25% 27%', '--accent': '215 25% 95%' }, dark: { '--primary': '215 25% 27%', '--accent': '215 25% 15%' } },
  { name: 'Synthwave', category: 'daisyUIThemes', light: { '--primary': '252 82% 62%', '--accent': '303 82% 62%' }, dark: { '--primary': '252 82% 62%', '--accent': '303 82% 20%' } },
  { name: 'Retro', category: 'daisyUIThemes', light: { '--primary': '45 89% 62%', '--accent': '35 89% 95%' }, dark: { '--primary': '45 89% 62%', '--accent': '35 89% 15%' } },
  { name: 'Valentine', category: 'daisyUIThemes', light: { '--primary': '313 77% 65%', '--accent': '313 77% 95%' }, dark: { '--primary': '313 77% 65%', '--accent': '313 77% 15%' } },
  { name: 'Halloween', category: 'daisyUIThemes', light: { '--primary': '23 98% 51%', '--accent': '23 98% 95%' }, dark: { '--primary': '23 98% 51%', '--accent': '23 98% 15%' } },
  { name: 'Garden', category: 'daisyUIThemes', light: { '--primary': '158 64% 52%', '--accent': '158 64% 95%' }, dark: { '--primary': '158 64% 52%', '--accent': '158 64% 15%' } },
  { name: 'Aqua', category: 'daisyUIThemes', light: { '--primary': '192 92% 45%', '--accent': '192 92% 95%' }, dark: { '--primary': '192 92% 45%', '--accent': '192 92% 15%' } },
  { name: 'Lofi', category: 'daisyUIThemes', light: { '--primary': '215 28% 17%', '--accent': '215 28% 95%' }, dark: { '--primary': '215 28% 70%', '--accent': '215 28% 15%' } },
  { name: 'Pastel', category: 'daisyUIThemes', light: { '--primary': '259 93% 68%', '--accent': '259 93% 95%' }, dark: { '--primary': '259 93% 68%', '--accent': '259 93% 15%' } },
  { name: 'Fantasy', category: 'daisyUIThemes', light: { '--primary': '272 49% 49%', '--accent': '272 49% 95%' }, dark: { '--primary': '272 49% 49%', '--accent': '272 49% 15%' } },
  { name: 'Wireframe', category: 'daisyUIThemes', light: { '--primary': '0 0% 45%', '--accent': '0 0% 95%' }, dark: { '--primary': '0 0% 70%', '--accent': '0 0% 15%' } },
  { name: 'Black', category: 'daisyUIThemes', light: { '--primary': '215 28% 17%', '--accent': '215 28% 95%' }, dark: { '--primary': '215 28% 70%', '--accent': '215 28% 15%' } },
  { name: 'Luxury', category: 'daisyUIThemes', light: { '--primary': '43 96% 56%', '--accent': '43 96% 95%' }, dark: { '--primary': '43 96% 56%', '--accent': '43 96% 15%' } },
  { name: 'Dracula', category: 'daisyUIThemes', light: { '--primary': '259 93% 68%', '--accent': '259 93% 95%' }, dark: { '--primary': '259 93% 68%', '--accent': '259 93% 15%' } },
  { name: 'CMYK', category: 'daisyUIThemes', light: { '--primary': '180 100% 50%', '--accent': '180 100% 95%' }, dark: { '--primary': '180 100% 50%', '--accent': '180 100% 15%' } },
  { name: 'Autumn', category: 'daisyUIThemes', light: { '--primary': '23 98% 51%', '--accent': '23 98% 95%' }, dark: { '--primary': '23 98% 51%', '--accent': '23 98% 15%' } },
  { name: 'Business', category: 'daisyUIThemes', light: { '--primary': '215 25% 27%', '--accent': '215 25% 95%' }, dark: { '--primary': '215 25% 70%', '--accent': '215 25% 15%' } },
  { name: 'Acid', category: 'daisyUIThemes', light: { '--primary': '101 100% 36%', '--accent': '101 100% 95%' }, dark: { '--primary': '101 100% 36%', '--accent': '101 100% 15%' } },
  { name: 'Lemonade', category: 'daisyUIThemes', light: { '--primary': '199 89% 48%', '--accent': '199 89% 95%' }, dark: { '--primary': '199 89% 48%', '--accent': '199 89% 15%' } },
  { name: 'Night', category: 'daisyUIThemes', light: { '--primary': '215 28% 17%', '--accent': '215 28% 95%' }, dark: { '--primary': '215 28% 70%', '--accent': '215 28% 15%' } },
  { name: 'Coffee', category: 'daisyUIThemes', light: { '--primary': '43 96% 56%', '--accent': '43 96% 95%' }, dark: { '--primary': '43 96% 56%', '--accent': '43 96% 15%' } },
  { name: 'Winter', category: 'daisyUIThemes', light: { '--primary': '217 91% 60%', '--accent': '217 91% 95%' }, dark: { '--primary': '217 91% 60%', '--accent': '217 91% 15%' } },
];

export const greyscaleThemes: ThemeDefinition[] = [
  { name: 'Charcoal', category: 'greyscaleThemes', light: { '--primary': '0 0% 25%', '--accent': '0 0% 85%' }, dark: { '--primary': '0 0% 70%', '--accent': '0 0% 20%' } },
  { name: 'Slate', category: 'greyscaleThemes', light: { '--primary': '210 10% 40%', '--accent': '210 10% 80%' }, dark: { '--primary': '210 10% 60%', '--accent': '210 10% 20%' } },
  { name: 'Stone', category: 'greyscaleThemes', light: { '--primary': '30 5% 50%', '--accent': '30 5% 90%' }, dark: { '--primary': '30 5% 65%', '--accent': '30 5% 20%' } },
  { name: 'Zinc', category: 'greyscaleThemes', light: { '--primary': '240 5% 60%', '--accent': '240 5% 95%' }, dark: { '--primary': '240 5% 70%', '--accent': '240 5% 20%' } },
  { name: 'Neutral', category: 'greyscaleThemes', light: { '--primary': '0 0% 50%', '--accent': '0 0% 90%' }, dark: { '--primary': '0 0% 80%', '--accent': '0 0% 20%' } },
  { name: 'Gray', category: 'greyscaleThemes', light: { '--primary': '0 0% 50%', '--accent': '0 0% 90%' }, dark: { '--primary': '0 0% 80%', '--accent': '0 0% 20%' } },
];

export const customThemes: ThemeDefinition[] = [
    {
      name: 'Ocean Breeze',
      category: 'customThemes',
      light: { '--background': '0 0% 97%', '--foreground': '215 28% 17%', '--card': '0 0% 100%', '--card-foreground': '215 28% 17%', '--popover': '0 0% 100%', '--popover-foreground': '215 28% 17%', '--primary': '207 83% 58%', '--primary-foreground': '210 20% 98%', '--secondary': '210 5% 53%', '--secondary-foreground': '215 28% 17%', '--muted': '210 5% 53%', '--muted-foreground': '215 20% 65%', '--accent': '142 67% 44%', '--accent-foreground': '210 20% 98%', '--destructive': '0 86% 56%', '--destructive-foreground': '210 20% 98%', '--border': '210 5% 53%', '--input': '210 5% 53%', '--ring': '207 83% 58%', },
      dark: { '--background': '215 28% 17%', '--foreground': '0 0% 97%', '--card': '215 28% 12%', '--card-foreground': '0 0% 97%', '--popover': '215 28% 12%', '--popover-foreground': '0 0% 97%', '--primary': '207 83% 58%', '--primary-foreground': '210 20% 98%', '--secondary': '210 5% 33%', '--secondary-foreground': '0 0% 97%', '--muted': '210 5% 33%', '--muted-foreground': '215 20% 75%', '--accent': '142 67% 44%', '--accent-foreground': '210 20% 98%', '--destructive': '0 86% 56%', '--destructive-foreground': '210 20% 98%', '--border': '210 5% 33%', '--input': '210 5% 33%', '--ring': '207 83% 58%', },
    },
    {
      name: 'Cosmic Indigo',
      category: 'customThemes',
      light: { '--background': '240 100% 94%', '--foreground': '246 33% 14%', '--card': '240 50% 98%', '--card-foreground': '246 33% 14%', '--popover': '240 50% 98%', '--popover-foreground': '246 33% 14%', '--primary': '246 76% 63%', '--primary-foreground': '240 100% 94%', '--secondary': '244 15% 80%', '--secondary-foreground': '246 33% 14%', '--muted': '244 15% 80%', '--muted-foreground': '244 15% 60%', '--accent': '185 100% 50%', '--accent-foreground': '246 33% 14%', '--destructive': '0 100% 71%', '--destructive-foreground': '240 100% 94%', '--border': '244 15% 80%', '--input': '244 15% 80%', '--ring': '246 76% 63%', },
      dark: { '--background': '246 33% 14%', '--foreground': '240 100% 94%', '--card': '248 23% 21%', '--card-foreground': '240 100% 94%', '--popover': '248 23% 21%', '--popover-foreground': '240 100% 94%', '--primary': '246 76% 63%', '--primary-foreground': '240 100% 94%', '--secondary': '244 15% 60%', '--secondary-foreground': '240 100% 94%', '--muted': '244 15% 60%', '--muted-foreground': '244 15% 40%', '--accent': '185 100% 50%', '--accent-foreground': '246 33% 14%', '--destructive': '0 100% 71%', '--destructive-foreground': '246 33% 14%', '--border': '244 15% 60%', '--input': '244 15% 60%', '--ring': '246 76% 63%', },
    },
    {
      name: 'Coral Grove',
      category: 'customThemes',
      light: { '--background': '28 83% 95%', '--foreground': '27 23% 24%', '--card': '0 0% 100%', '--card-foreground': '27 23% 24%', '--popover': '0 0% 100%', '--popover-foreground': '27 23% 24%', '--primary': '16 100% 66%', '--primary-foreground': '27 23% 24%', '--secondary': '0 0% 64%', '--secondary-foreground': '27 23% 24%', '--muted': '0 0% 64%', '--muted-foreground': '0 0% 40%', '--accent': '120 39% 49%', '--accent-foreground': '0 0% 100%', '--destructive': '0 63% 50%', '--destructive-foreground': '0 0% 100%', '--border': '0 0% 64%', '--input': '0 0% 64%', '--ring': '16 100% 66%', },
      dark: { '--background': '27 23% 14%', '--foreground': '28 83% 95%', '--card': '27 23% 18%', '--card-foreground': '28 83% 95%', '--popover': '27 23% 18%', '--popover-foreground': '28 83% 95%', '--primary': '16 100% 66%', '--primary-foreground': '27 23% 14%', '--secondary': '0 0% 50%', '--secondary-foreground': '28 83% 95%', '--muted': '0 0% 50%', '--muted-foreground': '0 0% 70%', '--accent': '120 39% 49%', '--accent-foreground': '0 0% 100%', '--destructive': '0 63% 50%', '--destructive-foreground': '28 83% 95%', '--border': '0 0% 50%', '--input': '0 0% 50%', '--ring': '16 100% 66%', },
    },
    {
      name: 'Red Sky',
      category: 'customThemes',
      light: { '--background': '0 0% 99%', '--foreground': '0 0% 13%', '--card': '0 0% 100%', '--card-foreground': '0 0% 13%', '--popover': '0 0% 100%', '--popover-foreground': '0 0% 13%', '--primary': '0 100% 71%', '--primary-foreground': '0 0% 100%', '--secondary': '0 0% 69%', '--secondary-foreground': '0 0% 13%', '--muted': '0 0% 69%', '--muted-foreground': '0 0% 40%', '--accent': '207 89% 53%', '--accent-foreground': '0 0% 100%', '--destructive': '356 70% 54%', '--destructive-foreground': '0 0% 100%', '--border': '0 0% 69%', '--input': '0 0% 69%', '--ring': '0 100% 71%', },
      dark: { '--background': '0 0% 13%', '--foreground': '0 0% 99%', '--card': '0 0% 16%', '--card-foreground': '0 0% 99%', '--popover': '0 0% 16%', '--popover-foreground': '0 0% 99%', '--primary': '0 100% 71%', '--primary-foreground': '0 0% 13%', '--secondary': '0 0% 31%', '--secondary-foreground': '0 0% 99%', '--muted': '0 0% 31%', '--muted-foreground': '0 0% 60%', '--accent': '207 89% 53%', '--accent-foreground': '0 0% 100%', '--destructive': '356 70% 54%', '--destructive-foreground': '0 0% 99%', '--border': '0 0% 31%', '--input': '0 0% 31%', '--ring': '0 100% 71%', },
    },
    {
      name: 'Cool Slate',
      category: 'customThemes',
      light: { '--background': '220 20% 96%', '--foreground': '224 10% 16%', '--card': '0 0% 100%', '--card-foreground': '224 10% 16%', '--popover': '0 0% 100%', '--popover-foreground': '224 10% 16%', '--primary': '248 80% 66%', '--primary-foreground': '0 0% 100%', '--secondary': '220 10% 60%', '--secondary-foreground': '224 10% 16%', '--muted': '220 10% 60%', '--muted-foreground': '220 10% 40%', '--accent': '185 100% 50%', '--accent-foreground': '0 0% 100%', '--destructive': '0 84.2% 60.2%', '--destructive-foreground': '0 0% 98%', '--border': '220 10% 60%', '--input': '220 10% 60%', '--ring': '248 80% 66%', },
      dark: { '--background': '224 10% 16%', '--foreground': '220 20% 96%', '--card': '224 10% 20%', '--card-foreground': '220 20% 96%', '--popover': '224 10% 20%', '--popover-foreground': '220 20% 96%', '--primary': '248 80% 66%', '--primary-foreground': '224 10% 16%', '--secondary': '220 10% 40%', '--secondary-foreground': '220 20% 96%', '--muted': '220 10% 40%', '--muted-foreground': '220 10% 60%', '--accent': '185 100% 50%', '--accent-foreground': '224 10% 16%', '--destructive': '0 84.2% 60.2%', '--destructive-foreground': '220 20% 96%', '--border': '220 10% 40%', '--input': '220 10% 40%', '--ring': '248 80% 66%', },
    },
    {
      name: 'Pastel Sky',
      category: 'customThemes',
      light: { '--background': '0 0% 99%', '--foreground': '0 0% 27%', '--card': '0 0% 100%', '--card-foreground': '0 0% 27%', '--popover': '0 0% 100%', '--popover-foreground': '0 0% 27%', '--primary': '206 90% 61%', '--primary-foreground': '0 0% 100%', '--secondary': '0 0% 75%', '--secondary-foreground': '0 0% 27%', '--muted': '0 0% 75%', '--muted-foreground': '0 0% 40%', '--accent': '350 100% 88%', '--accent-foreground': '0 0% 27%', '--destructive': '0 100% 64%', '--destructive-foreground': '0 0% 100%', '--border': '0 0% 75%', '--input': '0 0% 75%', '--ring': '206 90% 61%', },
      dark: { '--background': '0 0% 17%', '--foreground': '0 0% 89%', '--card': '0 0% 20%', '--card-foreground': '0 0% 89%', '--popover': '0 0% 20%', '--popover-foreground': '0 0% 89%', '--primary': '206 90% 61%', '--primary-foreground': '0 0% 10%', '--secondary': '0 0% 35%', '--secondary-foreground': '0 0% 89%', '--muted': '0 0% 35%', '--muted-foreground': '0 0% 60%', '--accent': '350 100% 78%', '--accent-foreground': '0 0% 10%', '--destructive': '0 100% 64%', '--destructive-foreground': '0 0% 89%', '--border': '0 0% 35%', '--input': '0 0% 35%', '--ring': '206 90% 61%', },
    },
    {
      name: 'Neon Fusion',
      category: 'customThemes',
      light: { '--background': '0 0% 96%', '--foreground': '0 0% 4%', '--card': '0 0% 88%', '--card-foreground': '0 0% 4%', '--popover': '0 0% 88%', '--popover-foreground': '0 0% 4%', '--primary': '330 100% 50%', '--primary-foreground': '0 0% 96%', '--secondary': '0 0% 50%', '--secondary-foreground': '0 0% 96%', '--muted': '0 0% 50%', '--muted-foreground': '0 0% 40%', '--accent': '180 100% 50%', '--accent-foreground': '0 0% 4%', '--destructive': '0 100% 60%', '--destructive-foreground': '0 0% 96%', '--border': '0 0% 50%', '--input': '0 0% 50%', '--ring': '330 100% 50%', },
      dark: { '--background': '0 0% 4%', '--foreground': '0 0% 96%', '--card': '0 0% 12%', '--card-foreground': '0 0% 96%', '--popover': '0 0% 12%', '--popover-foreground': '0 0% 96%', '--primary': '330 100% 50%', '--primary-foreground': '0 0% 96%', '--secondary': '0 0% 50%', '--secondary-foreground': '0 0% 96%', '--muted': '0 0% 50%', '--muted-foreground': '0 0% 60%', '--accent': '180 100% 50%', '--accent-foreground': '0 0% 4%', '--destructive': '0 100% 60%', '--destructive-foreground': '0 0% 96%', '--border': '0 0% 50%', '--input': '0 0% 50%', '--ring': '330 100% 50%', },
    },
    {
      name: 'Material Blue',
      category: 'customThemes',
      light: { '--background': '220 33% 95%', '--foreground': '0 0% 13%', '--card': '0 0% 100%', '--card-foreground': '0 0% 13%', '--popover': '0 0% 100%', '--popover-foreground': '0 0% 13%', '--primary': '210 79% 45%', '--primary-foreground': '0 0% 100%', '--secondary': '0 0% 62%', '--secondary-foreground': '0 0% 13%', '--muted': '0 0% 62%', '--muted-foreground': '0 0% 40%', '--accent': '45 100% 51%', '--accent-foreground': '0 0% 13%', '--destructive': '0 63% 50%', '--destructive-foreground': '0 0% 100%', '--border': '0 0% 62%', '--input': '0 0% 62%', '--ring': '210 79% 45%', },
      dark: { '--background': '0 0% 13%', '--foreground': '220 33% 95%', '--card': '0 0% 16%', '--card-foreground': '220 33% 95%', '--popover': '0 0% 16%', '--popover-foreground': '220 33% 95%', '--primary': '210 79% 55%', '--primary-foreground': '0 0% 13%', '--secondary': '0 0% 38%', '--secondary-foreground': '220 33% 95%', '--muted': '0 0% 38%', '--muted-foreground': '0 0% 70%', '--accent': '45 100% 51%', '--accent-foreground': '0 0% 13%', '--destructive': '0 63% 50%', '--destructive-foreground': '220 33% 95%', '--border': '0 0% 38%', '--input': '0 0% 38%', '--ring': '210 79% 55%', },
    },
    {
      name: 'Vaporwave Violet',
      category: 'customThemes',
      light: { '--background': '220 100% 96%', '--foreground': '240 14% 15%', '--card': '220 50% 99%', '--card-foreground': '240 14% 15%', '--popover': '220 50% 99%', '--popover-foreground': '240 14% 15%', '--primary': '271 76% 53%', '--primary-foreground': '220 100% 96%', '--secondary': '240 4% 68%', '--secondary-foreground': '240 14% 15%', '--muted': '240 4% 68%', '--muted-foreground': '240 4% 48%', '--accent': '180 100% 50%', '--accent-foreground': '240 14% 15%', '--destructive': '11 100% 62%', '--destructive-foreground': '220 100% 96%', '--border': '240 4% 68%', '--input': '240 4% 68%', '--ring': '271 76% 53%', },
      dark: { '--background': '240 14% 15%', '--foreground': '220 100% 96%', '--card': '240 11% 20%', '--card-foreground': '220 100% 96%', '--popover': '240 11% 20%', '--popover-foreground': '220 100% 96%', '--primary': '271 76% 53%', '--primary-foreground': '220 100% 96%', '--secondary': '240 4% 68%', '--secondary-foreground': '220 100% 96%', '--muted': '240 4% 68%', '--muted-foreground': '240 4% 48%', '--accent': '180 100% 50%', '--accent-foreground': '240 14% 15%', '--destructive': '11 100% 62%', '--destructive-foreground': '220 100% 96%', '--border': '240 4% 68%', '--input': '240 4% 68%', '--ring': '271 76% 53%', },
    },
    {
      name: 'Growth Green',
      category: 'customThemes',
      light: { '--background': '120 100% 98%', '--foreground': '210 10% 23%', '--card': '0 0% 100%', '--card-foreground': '210 10% 23%', '--popover': '0 0% 100%', '--popover-foreground': '210 10% 23%', '--primary': '134 61% 40%', '--primary-foreground': '0 0% 100%', '--secondary': '208 7% 48%', '--secondary-foreground': '0 0% 100%', '--muted': '208 7% 48%', '--muted-foreground': '208 7% 30%', '--accent': '211 100% 50%', '--accent-foreground': '0 0% 100%', '--destructive': '354 70% 54%', '--destructive-foreground': '0 0% 100%', '--border': '208 7% 48%', '--input': '208 7% 48%', '--ring': '134 61% 40%', },
      dark: { '--background': '210 10% 15%', '--foreground': '120 100% 98%', '--card': '210 10% 20%', '--card-foreground': '120 100% 98%', '--popover': '210 10% 20%', '--popover-foreground': '120 100% 98%', '--primary': '134 61% 50%', '--primary-foreground': '0 0% 100%', '--secondary': '208 7% 35%', '--secondary-foreground': '0 0% 100%', '--muted': '208 7% 35%', '--muted-foreground': '208 7% 60%', '--accent': '211 100% 60%', '--accent-foreground': '0 0% 100%', '--destructive': '354 70% 54%', '--destructive-foreground': '0 0% 100%', '--border': '208 7% 35%', '--input': '208 7% 35%', '--ring': '134 61% 50%', },
    },
    {
      name: 'Azure Gleam',
      category: 'customThemes',
      swatchColor: '217 91% 60%',
      light: { '--background': '210 17% 98%', '--foreground': '215 28% 17%', '--card': '0 0% 100%', '--card-foreground': '215 28% 17%', '--popover': '0 0% 100%', '--popover-foreground': '215 28% 17%', '--primary': '217 91% 60%', '--primary-foreground': '0 0% 100%', '--secondary': '215 14% 55%', '--secondary-foreground': '215 28% 17%', '--muted': '215 14% 55%', '--muted-foreground': '215 14% 45%', '--accent': '217 86% 97%', '--accent-foreground': '0 0% 100%', '--destructive': '5 81% 57%', '--destructive-foreground': '0 0% 100%', '--border': '215 14% 55%', '--input': '215 14% 55%', '--ring': '207 68% 54%', },
      dark: { '--background': '215 28% 17%', '--foreground': '210 17% 98%', '--card': '215 28% 17%', '--card-foreground': '210 17% 98%', '--popover': '215 28% 17%', '--popover-foreground': '210 17% 98%', '--primary': '217 91% 60%', '--primary-foreground': '0 0% 100%', '--secondary': '215 14% 35%', '--secondary-foreground': '210 17% 98%', '--muted': '215 14% 35%', '--muted-foreground': '215 14% 65%', '--accent': '217 86% 15%', '--accent-foreground': '0 0% 100%', '--destructive': '5 81% 57%', '--destructive-foreground': '0 0% 100%', '--border': '215 14% 35%', '--input': '215 14% 35%', '--ring': '207 68% 54%', },
    },
    {
      name: 'Cyber Sapphire',
      category: 'customThemes',
      swatchColor: '195 85% 41%',
      light: { '--background': '220 13% 96%', '--foreground': '220 9% 10%', '--card': '220 13% 96%', '--card-foreground': '220 9% 10%', '--popover': '220 13% 96%', '--popover-foreground': '220 9% 10%', '--primary': '195 85% 41%', '--primary-foreground': '356 100% 97%', '--secondary': '220 13% 91%', '--secondary-foreground': '220 9% 10%', '--muted': '220 13% 91%', '--muted-foreground': '220 9% 45%', '--accent': '38 92% 50%', '--accent-foreground': '38 92% 5%', '--destructive': '0 84.2% 60.2%', '--destructive-foreground': '0 0% 98%', '--border': '220 13% 88%', '--input': '220 13% 88%', '--ring': '195 85% 41%', },
      dark: { '--background': '220 9% 10%', '--foreground': '220 13% 96%', '--card': '220 9% 10%', '--card-foreground': '220 13% 96%', '--popover': '220 9% 10%', '--popover-foreground': '220 13% 96%', '--primary': '195 85% 41%', '--primary-foreground': '356 100% 97%', '--secondary': '220 13% 15%', '--secondary-foreground': '220 13% 96%', '--muted': '220 13% 15%', '--muted-foreground': '220 9% 55%', '--accent': '38 92% 50%', '--accent-foreground': '38 92% 5%', '--destructive': '0 62.8% 30.6%', '--destructive-foreground': '0 0% 98%', '--border': '220 13% 20%', '--input': '220 13% 20%', '--ring': '195 85% 41%', },
    },
    {
      name: 'Emerald Echo',
      category: 'customThemes',
      swatchColor: '145 63% 49%',
      light: { '--background': '135 100% 97%', '--foreground': '240 10% 3.9%', '--card': '0 0% 100%', '--card-foreground': '240 10% 3.9%', '--popover': '0 0% 100%', '--popover-foreground': '240 10% 3.9%', '--primary': '145 63% 49%', '--primary-foreground': '145 50% 98%', '--secondary': '240 4.8% 95.9%', '--secondary-foreground': '240 5.9% 10%', '--muted': '240 4.8% 95.9%', '--muted-foreground': '240 3.8% 46.1%', '--accent': '207 70% 53%', '--accent-foreground': '0 0% 98%', '--destructive': '0 84.2% 60.2%', '--destructive-foreground': '0 0% 98%', '--border': '240 5.9% 90%', '--input': '240 5.9% 90%', '--ring': '145 63% 49%', },
      dark: { '--background': '240 10% 3.9%', '--foreground': '0 0% 98%', '--card': '240 10% 3.9%', '--card-foreground': '0 0% 98%', '--popover': '240 10% 3.9%', '--popover-foreground': '0 0% 98%', '--primary': '145 63% 49%', '--primary-foreground': '145 50% 98%', '--secondary': '240 3.7% 15.9%', '--secondary-foreground': '0 0% 98%', '--muted': '240 3.7% 15.9%', '--muted-foreground': '240 5% 64.9%', '--accent': '207 70% 53%', '--accent-foreground': '0 0% 98%', '--destructive': '0 62.8% 30.6%', '--destructive-foreground': '0 0% 98%', '--border': '240 3.7% 15.9%', '--input': '240 3.7% 15.9%', '--ring': '145 63% 49%', },
    },
    {
      name: 'Glacial Blue',
      category: 'customThemes',
      swatchColor: '217 91% 60%',
      light: { '--background': '207 88% 94%', '--foreground': '224 71.4% 4.1%', '--card': '207 88% 98%', '--card-foreground': '224 71.4% 4.1%', '--popover': '0 0% 100%', '--popover-foreground': '224 71.4% 4.1%', '--primary': '207 90% 68%', '--primary-foreground': '210 20% 98%', '--secondary': '220 14.3% 95.9%', '--secondary-foreground': '220.9 39.3% 11%', '--muted': '220 14.3% 95.9%', '--muted-foreground': '220 8.9% 46.1%', '--accent': '261 46% 63%', '--accent-foreground': '0 0% 100%', '--destructive': '0 84.2% 60.2%', '--destructive-foreground': '0 0% 98%', '--border': '220 13% 91%', '--input': '220 13% 91%', '--ring': '207 90% 68%', },
      dark: { '--background': '224 71.4% 4.1%', '--foreground': '210 20% 98%', '--card': '224 71.4% 4.1%', '--card-foreground': '210 20% 98%', '--popover': '224 71.4% 4.1%', '--popover-foreground': '210 20% 98%', '--primary': '207 90% 68%', '--primary-foreground': '210 20% 98%', '--secondary': '215 27.9% 16.9%', '--secondary-foreground': '210 20% 98%', '--muted': '215 27.9% 16.9%', '--muted-foreground': '217.9 10.6% 64.9%', '--accent': '261 46% 63%', '--accent-foreground': '0 0% 100%', '--destructive': '0 62.8% 30.6%', '--destructive-foreground': '0 0% 98%', '--border': '215 27.9% 16.9%', '--input': '215 27.9% 16.9%', '--ring': '207 90% 68%', },
    },
    {
      name: 'Arctic Blue',
      category: 'customThemes',
      swatchColor: '217 91% 60%',
      light: { '--background': '197 78% 94%', '--foreground': '222.2 47.4% 11.2%', '--card': '0 0% 100%', '--card-foreground': '222.2 47.4% 11.2%', '--popover': '0 0% 100%', '--popover-foreground': '222.2 47.4% 11.2%', '--primary': '197 78% 52%', '--primary-foreground': '0 0% 100%', '--secondary': '197 50% 90%', '--secondary-foreground': '222.2 47.4% 11.2%', '--muted': '197 50% 90%', '--muted-foreground': '215.4 16.3% 46.9%', '--accent': '180 100% 25.1%', '--accent-foreground': '0 0% 100%', '--destructive': '0 84.2% 60.2%', '--destructive-foreground': '0 0% 98%', '--border': '197 50% 88%', '--input': '197 50% 88%', '--ring': '197 78% 52%', },
      dark: { '--background': '222.2 47.4% 11.2%', '--foreground': '210 40% 98%', '--card': '222.2 47.4% 11.2%', '--card-foreground': '210 40% 98%', '--popover': '222.2 47.4% 11.2%', '--popover-foreground': '210 40% 98%', '--primary': '197 78% 52%', '--primary-foreground': '0 0% 100%', '--secondary': '217.2 32.6% 17.5%', '--secondary-foreground': '210 40% 98%', '--muted': '217.2 32.6% 17.5%', '--muted-foreground': '215 20.2% 65.1%', '--accent': '180 100% 35.1%', '--accent-foreground': '0 0% 100%', '--destructive': '0 62.8% 30.6%', '--destructive-foreground': '210 40% 98%', '--border': '217.2 32.6% 17.5%', '--input': '217.2 32.6% 17.5%', '--ring': '197 78% 52%', },
    },
];

export const appThemes: Record<ThemeCategory, ThemeDefinition[]> = {
    bespokeThemes,
    primaryColorsThemes,
    daisyUIThemes,
    greyscaleThemes,
    customThemes,
};
