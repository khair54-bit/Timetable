# Timetable Application 🗓

A simple and lightweight **Timetable Application** that uses a local JSON file as its database. The application allows you to manage and display schedules with ease. Ideal for personal projects or small offline setups.

---

## Features 🚀
- **Local Database**: Uses a JSON file (`data.json`) for storing timetable data.
- **CRUD Operations**: Create, Read, Update, and Delete schedules seamlessly.
- **Easy Setup**: Simple installation with minimal configuration.
- **Lightweight**: No heavy dependencies or database servers required.

---

## Installation 🔧

Follow these steps to set up the application locally:

1. **Clone the repository**  
   Clone the project to your local machine using the command:
   ```bash
   git clone https://github.com/khair54-bit/Timetable.git
   cd Timetable
   ```

2. **Rename the Database File**  
   - Go to the folder `system/db`.
   - Rename the file `data.json.example` to `data.json`.

   Example:
   ```bash
   mv system/db/data.json.example system/db/data.json
   ```

3. **Start the Application**  
   Serve the project using a local PHP server (or any preferred method):
   ```bash
   php -S localhost:8000
   ```

4. **Access the Application**  
   Open your browser and go to:  
   [http://localhost:8000](http://localhost:8000)

---

## Project Structure 📂
```
/system
  ├── /db
  |     ├── data.json.example   # Example database file
  |     └── data.json           # Your renamed database file
  |
  ├── write.php                 # Handles creating new records
  ├── read.php                  # Handles reading records
  ├── update.php                # Handles updating records
  └── delete.php                # Handles deleting records
/index.php                     # Main entry point
/style.css                     # Stylesheet for the UI
/README.md                     # Project documentation
```

---

## Usage 📝

- **Add Timetable Data**: Modify `data.json` directly or implement a form for dynamic input.
- **Manage Data**: Perform CRUD operations to handle timetable entries.
- **Customize UI**: Update `style.css` to change the appearance.

---

## Example `data.json` 📄
Below is a basic structure of the `data.json` file:
```json
[
    {
        "id": 1732343525112,
        "time": "06:30 AM - 05:00 PM",
        "monday": "asdada",
        "tuesday": "",
        "wednesday": "",
        "thursday": "",
        "friday": ""
    },
    {
        "id": 1732343554148,
        "time": "07:00 AM - 08:00 AM",
        "monday": "Meeting1",
        "tuesday": "",
        "wednesday": "",
        "thursday": "",
        "friday": ""
    }
]
```

---

## Requirements 💻
- **PHP 7.4+**
- A modern web browser (Chrome, Firefox, Edge, etc.)

---

## Contributing 🤝
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add new feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a Pull Request.

---

## License 📜
This project is licensed under the **MIT License**.  
Feel free to use and modify it for your needs.

---

## Contact 📧
For any inquiries or feedback, reach out via:  
**Email**: khairani@poliban.ac.id  
**GitHub**: [https://github.com/khair54-bit](https://github.com/khair54-bit)

---

### Happy Coding! 🎉
