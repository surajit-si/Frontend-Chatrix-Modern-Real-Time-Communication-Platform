function devErrorLog(err) {
  if (import.meta.env.VITE_NODE_ENV === "development") {
    console.error(err);
  }
}

export default devErrorLog;
