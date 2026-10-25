# Goals Δ

**Analyse football the way traders analyse markets.**

Goals Δ (Goals Delta) is a data visualisation app that charts football team goals as a continuous plot, using the conventions of financial technical analysis: candlesticks, momentum indicators and drawing tools. It lets fans explore real-world scoring data with the same tools used on Forex and crypto charts.

> **Note:** Goals Δ currently runs on a hard-coded, in-memory dataset. It does not display live match data.

---

## Why Goals Δ?

Football is full of data, but most of it is shown as static tables and season totals. Those formats make it hard to see _momentum_: when a team is heating up, fading late, or starting games slowly.

Traders solved a similar problem decades ago with charting. Goals Δ borrows that visual language and applies it to goals, so patterns in scoring become something you can see, measure and compare.

## Features

- **Continuous goals plot** – a team's goals charted as one running series rather than isolated match results
- **Two viewing modes** – analyse goals **by match** or **by half**
- **Head-to-head comparison** - compare two teams side by side
- **OHLC candlesticks** – familiar open-high-low-close candles applied to goals data
- **Technical indicators** – including **RSI** and **MACD**
- **Fibonacci and drawing overlay tools** – draw retracement levels directly on the chart
- **Real-world data** – built on match data from [FootyStats](https://footystats.org)

## Tech stack

- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- Chart.js

## Getting started

### Installation

```bash
# Clone the repository
git clone https://github.com/vincor1986/goals_delta.git
cd goals-delta

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm start
```

## Data

All data comes from [FootyStats](https://footystats.org) and is stored as a hard-coded dataset held in memory. This means:

- No API keys or environment variables are needed to run the project
- The app works offline once running
- The data is a **snapshot** and will not update as new matches are played

Goals Δ is an independent project and is not affiliated with or endorsed by FootyStats.

## Roadmap

- [ ] Replace the static dataset with a live data source
- [ ] Support more teams and competitions
- [ ] Add further indicators and overlay tools

## Disclaimer

Goals Δ is a tool for exploring and visualising football data. It is not financial or betting advice, and indicators borrowed from financial analysis do not predict match outcomes.

## Contributing

Suggestions and bug reports are welcome. Please open an issue to discuss any significant change before submitting a pull request.

## License

Distributed under the [MIT License](LICENSE).

## Author

**Vincent Coraldean**

[Portfolio](https://www.vincentcoraldean.com/) · [LinkedIn](https://www.linkedin.com/in/vincentcoraldean/) · [GitHub](https://github.com/vincor1986)
