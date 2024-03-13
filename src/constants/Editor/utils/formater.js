import { deepOrange } from "@mui/material/colors";

export function formatDateString(dateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);
  
    const time = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  
    return `${formattedDate} at ${time}`;
  }


export  function stringAvatar(username) {
    return {
        sx: {
        bgcolor: deepOrange[500],
            // bgcolor: stringToColor(name),
        },
        children: `${username.split(' ')[0][0]}`,
    };
}
  
export function timeAgo(timestamp) {
  const now = new Date();
  const timestampDate = new Date(timestamp);
  const seconds = Math.floor((now - timestampDate) / 1000);
  let interval = Math.floor(seconds / 60);

  if (interval < 1) {
    return 'Just now';
  } else if (interval < 60) {
    return interval + ' minute(s) ago';
  } else {
    interval = Math.floor(interval / 60);
    return interval + ' hour(s) ago';
  }
}
