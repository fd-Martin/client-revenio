// tailwind.config.js
module.exports = {
  darkMode: "class", // important for dark mode toggle
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e85d04', // orange-ish for primary light mode
          content: '#fff',
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      {
        mydark: {
          primary: "#e85d04",
          "primary-content": "#fff",
          // rest color overrides...
          "base-100": "#121212",
          "base-900": "#0a0a0a",
        },
      },
    ],
  },
};
/* Default desktop scrollbar visible */
.custom-scroll::-webkit-scrollbar {
  width: 8px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  border-radius: 10px;
}

/* Mobile: Hide scrollbar completely */
@media (max-width: 768px) {
  .custom-scroll::-webkit-scrollbar {
    display: none;
  }
  .custom-scroll {
    -ms-overflow-style: none;  /* IE, Edge */
    scrollbar-width: none;     /* Firefox */
  }
}
