export const formatDate = (date) => {
  const customDate = new Date(date);

  // Using 'sv-SE' for Swedish locale, and a custom date/time format
  const formattedDate = customDate.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long", // This gives you the full month name in Swedish (e.g., "april")
    day: "numeric",
  });

  const formattedTime = customDate.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${formattedDate} ${formattedTime}`;
};
