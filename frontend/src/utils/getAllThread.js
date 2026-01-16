export const getAllThread = async (setAllThreads) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("https://queryflow-ai-backend.onrender.com", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const res = await response.json();
        const filteredData = res.map(thread => ({
            threadId: thread.threadId,
            title: thread.title
        }));
        setAllThreads(filteredData);
    } catch (err) {
        console.log(err);
    }
}

