"use client"
import useNotifications from "@/hooks/useNotifications";
import React from "react";

function SnackBar() {
  const { show } = useNotifications();
  if (show) {
    return <div>SnackBar</div>;
  }

  return null;
}

export default SnackBar;
