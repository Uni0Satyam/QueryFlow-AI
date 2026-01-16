export const getAllThread = async (setAllThreads) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("http://localhost:8080/api/thread", {
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

