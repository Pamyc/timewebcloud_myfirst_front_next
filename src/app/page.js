// app-example-next-main/src/app/page.js

// Директива для Next.js, чтобы этот компонент работал в браузере
"use client"; 

import Image from "next/image";
import styles from "./page.module.css";
// Импортируем хуки React для работы с состоянием и эффектами
import { useState, useEffect } from "react";

export default function Home() {
  // Создаем состояние для хранения сообщения с бэкенда
  // Изначально показываем "Загрузка..."
  const [message, setMessage] = useState("Загрузка...");

  // Этот код выполнится один раз после загрузки страницы
  useEffect(() => {
    // Отправляем запрос на наш бэкенд Fastify
    fetch('http://localhost:3000/api/message')
      .then(response => response.json()) // Превращаем ответ в JSON
      .then(data => {
        // Обновляем состояние полученным сообщением
        setMessage(data.message); 
      })
      .catch(error => {
        // Если произошла ошибка (например, бэкенд не запущен)
        console.error("Ошибка при запросе к бэкенду:", error);
        setMessage("Не удалось загрузить данные :(");
      });
  }, []); // Пустой массив означает "выполнить только один раз"

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      {/* Здесь мы выводим наше сообщение */}
      <div className={styles.description}>
        <h2>{message}</h2>
      </div>
      
    </main>
  );
}