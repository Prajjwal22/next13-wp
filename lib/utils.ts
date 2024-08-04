// Formatter for "Today" and "Yesterday" etc
const relative = new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" });

// Formatter for weekdays, e.g. "Monday"
const short = new Intl.DateTimeFormat("en-GB", { weekday: "long" });

// Formatter for dates, e.g. "Mon, 31 May 2021"
const long = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const formatDate = (date: Date) => {
  const now = new Date().setHours(0, 0, 0, 0);
  const then = date.setHours(0, 0, 0, 0);
  const days = (then - now) / 86400000;
  if (days > -6) {
    if (days > -2) {
      return relative.format(days, "day");
    }
    return short.format(date);
  }
  return long.format(date);
};

export const getBlurImage = async (image: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/blur`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ src: image }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blur image");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blur image:", error);
    throw error;
  }
};
