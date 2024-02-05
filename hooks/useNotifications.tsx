import React, { useContext } from 'react'
import { NotificationsContext } from '@/context/NotificationContext'

export default function useNotifications() {
  return useContext(NotificationsContext);
}
