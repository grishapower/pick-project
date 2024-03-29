"use client";

import { Heading, Text } from "~/components";

export default function PrivacyPage() {
  return (
    <div>
      <Heading className="mb-2 text-[28px] font-bold">
        Решение проблемы честности 2
      </Heading>
      <Text className="text-grey mb-4 text-lg">
        Основная концепция доказуемой честности заключается в том, что у игроков
        есть возможность доказать и проверить, что их результаты честны и не
        подтасованы. Это достигается за счет использования схемы обязательств,
        наряду с криптографическим хешированием.
      </Text>
      <Text className="text-grey mb-4 text-lg">
        Схема обязательств используется для обеспечения того, чтобы игрок мог
        влиять на все сгенерированные исходы игры. Криптографическое хеширование
        используется для того, чтобы казино также оставалось честным в отношении
        этой схемы обязательств. Объединение обеих концепций создает надежную
        среду при азартных играх в Интернете.
      </Text>
      <Text className="text-grey mb-4 text-lg">
        Упрощенное представление данного концепта:
      </Text>

      <Heading className="mb-2 text-[28px] font-bold">
        Решение проблемы честности
      </Heading>
      <Text className="text-grey mb-4 text-lg">
        Основная концепция доказуемой честности заключается в том, что у игроков
        есть возможность доказать и проверить, что их результаты честны и не
        подтасованы. Это достигается за счет использования схемы обязательств,
        наряду с криптографическим хешированием.
      </Text>
      <Text className="text-grey mb-4 text-lg">
        Схема обязательств используется для обеспечения того, чтобы игрок мог
        влиять на все сгенерированные исходы игры. Криптографическое хеширование
        используется для того, чтобы казино также оставалось честным в отношении
        этой схемы обязательств. Объединение обеих концепций создает надежную
        среду при азартных играх в Интернете.
      </Text>
      <Text className="text-grey mb-4 text-lg">
        Упрощенное представление данного концепта:
      </Text>
    </div>
  );
}
