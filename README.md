# Ihhor Card — кастомний термостат для Home Assistant

Картка показує поточну/цільову температуру та вологість для `climate.*` ентиті, відображаючи макет як у виджеті `Спальня Сонячна`: теплий фон, внутрішня панель із великим показником, червоне значення цілі й рядок режимів (OFF/ON/AUTO/PROG).

## Можливості
- Поточна й цільова температура, вологість, індикатор нагріву (SVG термометр, підсвічується в heat).
- Крок зміни температури за замовчуванням `0.1` (кнопки ↑/↓ в колонці термометра), можна задати `step` у конфігу.
- Рядок режимів: можна показувати `hvac_modes` або `preset_modes` (через `mode_type: hvac|preset`), список кнопок конфігурується.
- Налаштовувані кольори (фон, рамка, акцент, текст) у стилі референсної сторінки.
- Прев’ю з моковим hass (`npm run dev`) для швидкого редагування зовнішнього вигляду.
- Збірка в один файл `ihhor-card.js`, додано `hacs.json` для публікації через HACS.

## Розробка та прев’ю
1. Встановити залежності: `npm install`.
2. Запустити прев’ю: `npm run dev` → Vite підніме сторінку `index.html` з моковими даними (`src/preview.ts`).
3. Збірка: `npm run build` → артефакт `dist/ihhor-card.js` + sourcemap.

## Використання в Home Assistant
1. Покладіть `dist/ihhor-card.js` у `config/www/ihhor-card/`.
2. Додайте ресурс у Lovelace (UI або `configuration.yaml`):
   ```yaml
   lovelace:
     resources:
       - url: /local/ihhor-card/ihhor-card.js
         type: module
   ```
3. Додайте картку на дашборд:
   ```yaml
   type: custom:ihhor-card
   entity: climate.sunny_bedroom   # ваш climate entity
   name: Спальня Сонячна           # опціонально
   background: "#ebe2cb"           # опціонально
   border_color: "#626364"         # опціонально
   accent_color: "#d87474"         # опціонально (ціль/акценти)
   text_color: "#000000"           # опціонально
   step: 0.1                       # опціонально, крок зміни температури
   mode_type: preset               # hvac | preset — тип перемикача режимів
   modes:
     - off
     - on
     - auto
     - prog
   ```

## Публікація через HACS
- У репозиторії присутній `hacs.json` (filename: `ihhor-card.js`).
- Для ручного тесту як custom repo: додайте репозиторій у HACS, завантажте `dist/ihhor-card.js`, а Lovelace ресурс вкажіть на `/local/ihhor-card/ihhor-card.js`.

## Структура
- `src/ihhor-card.ts` — основна картка (LitElement).
- `src/preview.ts` — моковий hass та макет для розробки UI.
- `index.html` — вхідна сторінка прев’ю для Vite.
- `vite.config.ts` — збірка в єдиний файл `ihhor-card.js`.
