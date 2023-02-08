export function formatDate(date, format) {
    if (!date) return "-";
    switch (format) {
        case "mmm dd, yyyy":
            return `${new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            })} ${new Date(date).toLocaleString("en-GB", {
                hour: "numeric",
                minute: "numeric",
            })}`;
        case "mmmm dd, yyyy":
            return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            });
        case "dd mm yyyy":
            return new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            });
        case "dd/mm/yyyy":
            return new Date(date).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            });
        case "yyyy, mm, dd":
            return new Date(date).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            });
        case "EEEE, dd mmm yyyy":
            return new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        case "hh:mm":
            return new Date(date).toLocaleDateString("en-GB", {
                hour: "numeric",
                minute: "numeric",
            }).split(",")[1];
        default:
            return date;
    }
}