/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "id-back": "url('@/assets/id_back.jpg')",
      },
    },
  },
  plugins: [import("tailwind-scrollbar")],
};
