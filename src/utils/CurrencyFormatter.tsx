const CURRENCY_FORMATTER = new Intl.NumberFormat('vi-VN', {
    currency: 'VND',
    style: 'currency',
});

export const formatCurrency = (number: number): string => {
    return CURRENCY_FORMATTER.format(number);
};

export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
    });
};

// export const calculateReadingTime = (text: string): string => {
//     const wordsPerMinute = 200;
//     const words = text.split(/\s+/).length;
//     const minutes = Math.ceil(words / wordsPerMinute);
//     return `${minutes} phút đọc`;
// };

export const calculateReadingTime = (
    content: { type: string; content?: string; title?: string; src?: string }[],
) => {
    const wordsPerMinute = 200; // Giả định tốc độ đọc là 200 từ/phút
    let totalWords = 0;
    let imageCount = 0;

    content.forEach((item) => {
        if (item.content) {
            totalWords += item.content.split(/\s+/).length;
        }
        if (item.title) {
            totalWords += item.title.split(/\s+/).length;
        }
        if (item.type === 'image') {
            imageCount++; // Đếm số lượng ảnh
        }
    });

    const readingTime = Math.ceil(totalWords / wordsPerMinute); // Làm tròn lên
    const imageTime = imageCount * 10; // Mỗi ảnh mất khoảng 10 giây để xem
    return Math.ceil(readingTime + imageTime / 60); // Chuyển giây thành phút
};
