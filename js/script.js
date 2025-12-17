import { loadComponents } from './components.js';

// Load Header/Footer first
loadComponents();

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {

        function updateButtonText(theme) {
            toggleButton.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
        }

        // Scheduler Logic
        const modal = document.getElementById('scheduler-modal');
        const openBtn = document.getElementById('open-scheduler');
        const closeBtn = document.getElementsByClassName('close-modal')[0];
        const form = document.getElementById('scheduler-form');
        const dateInput = document.getElementById('chat-date');
        const timeSelect = document.getElementById('chat-time');
        const dateError = document.getElementById('date-error');

        // Available time slots
        const allTimeSlots = [
            { value: "19:00", label: "19:00 (7:00 PM)" },
            { value: "19:30", label: "19:30 (7:30 PM)" },
            { value: "20:00", label: "20:00 (8:00 PM)" },
            { value: "20:30", label: "20:30 (8:30 PM)" },
            { value: "21:00", label: "21:00 (9:00 PM)" }
        ];

        // Import Firestore dynamically
        let db, collection, addDoc, query, where, getDocs;

        async function initFirebase() {
            try {
                const module = await import('./firebase-config.js');
                db = module.db;
                const firestore = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
                collection = firestore.collection;
                addDoc = firestore.addDoc;
                query = firestore.query;
                where = firestore.where;
                getDocs = firestore.getDocs;
            } catch (e) {
                console.error("Firebase init failed:", e);
            }
        }

        initFirebase();

        async function getBookedSlots(date) {
            if (!db) return [];
            const q = query(collection(db, "bookings"), where("date", "==", date));
            const querySnapshot = await getDocs(q);
            const booked = [];
            querySnapshot.forEach((doc) => {
                booked.push(doc.data().time);
            });
            return booked;
        }

        async function updateTimeOptions(selectedDate) {
            timeSelect.innerHTML = '<option value="">Loading slots...</option>';
            timeSelect.disabled = true;

            const booked = await getBookedSlots(selectedDate);

            // Clear existing options
            timeSelect.innerHTML = '<option value="">Select Time</option>';
            timeSelect.disabled = false;

            allTimeSlots.forEach(slot => {
                if (!booked.includes(slot.value)) {
                    const option = document.createElement('option');
                    option.value = slot.value;
                    option.textContent = slot.label;
                    timeSelect.appendChild(option);
                }
            });

            if (timeSelect.options.length === 1) {
                const option = document.createElement('option');
                option.disabled = true;
                option.textContent = "No slots available";
                timeSelect.appendChild(option);
            }
        }

        if (openBtn) {
            openBtn.onclick = () => {
                modal.style.display = "block";
                // Reset form on open
                form.reset();
                timeSelect.innerHTML = '<option value="">Select Date First</option>';
            };

            closeBtn.onclick = () => modal.style.display = "none";
            window.onclick = (event) => {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

            // Date Validation (Saturdays Only) & Availability Check
            dateInput.addEventListener('change', async (e) => {
                const dateVal = e.target.value;
                if (!dateVal) return;

                const date = new Date(dateVal);
                const day = date.getDay();

                // 6 = Saturday
                if (day !== 6) {
                    dateError.textContent = "Please select a Saturday.";
                    dateInput.setCustomValidity("Saturdays only");
                    timeSelect.innerHTML = '<option value="">Invalid Date</option>';
                    timeSelect.disabled = true;
                } else {
                    dateError.textContent = "";
                    dateInput.setCustomValidity("");
                    timeSelect.disabled = false;
                    await updateTimeOptions(dateVal);
                }
            });

            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const dateVal = document.getElementById('chat-date').value;
                const timeVal = document.getElementById('chat-time').value;
                const msgVal = document.getElementById('chat-message').value;

                if (!dateVal || !timeVal) return;

                // Save booking to Firestore
                try {
                    await addDoc(collection(db, "bookings"), {
                        date: dateVal,
                        time: timeVal,
                        message: msgVal,
                        createdAt: new Date()
                    });
                } catch (e) {
                    console.error("Error booking slot:", e);
                    alert("Failed to book slot. Please check your connection.");
                    return;
                }

                // Create Start/End DateTimes for Google Calendar
                // Format: YYYYMMDDThhmmss
                const startTime = dateVal.replace(/-/g, '') + 'T' + timeVal.replace(':', '') + '00';

                // Calculate end time (30 mins later)
                let [hours, minutes] = timeVal.split(':').map(Number);
                minutes += 30;
                if (minutes >= 60) {
                    hours += 1;
                    minutes -= 60;
                }
                const endTimeStr = hours.toString().padStart(2, '0') + minutes.toString().padStart(2, '0') + '00';
                const endTime = dateVal.replace(/-/g, '') + 'T' + endTimeStr;

                const title = encodeURIComponent("Catch-up with James Olayinka");
                const details = encodeURIComponent(`Message: ${msgVal}\n\nScheduled via jamesolayinka.com`);
                const location = encodeURIComponent("Google Meet / Zoom");
                const guest = encodeURIComponent("jolayinka463@gmail.com"); // James's email

                const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}&add=${guest}`;

                window.open(gCalUrl, '_blank');
                modal.style.display = "none";

                alert("Slot booked! Google Calendar invite generated.");
            });
        }
    });
