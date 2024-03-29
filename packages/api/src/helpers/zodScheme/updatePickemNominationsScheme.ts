import { z } from "zod";

const nominationSchema = z.record(z.number());

// Создаем кастомную схему, которая проверяет максимальное количество ключей
export const updatePickemNominationsScheme = z.object({
  nominations: nominationSchema.refine(
    (data) => {
      // Получаем ключи объекта и их количество
      const keys = Object.keys(data);
      return keys.length <= 16;
    },
    {
      message: "The object can have a maximum of 16 keys", // Сообщение об ошибке
    },
  ),
});
