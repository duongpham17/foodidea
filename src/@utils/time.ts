export const UK = (time: Date | number) => {
    return new Date(time).toLocaleString('en-US', {timeZone: "Europe/London"})
};

export const date = (iso: string | Date, length=0): string => {
    return iso.toLocaleString().split("T").join(" ").slice(length, 19);
};

export const ddmmyy = (timestamp: number) => {
    return new Date(timestamp).toUTCString().split(",")[1].split(" ").slice(0, 4).join(" ")
}

export const timerLess24 = (future_time: number) => {
    return new Date(future_time - Date.now()).toISOString().slice(11,19);
};

export const timeExpired = (future: Date | number) => {
    const isExpired = Date.now() >= new Date(future).getTime() + (60 * 60 * 1000) 
    return isExpired
};

export const timeDifferenceDate = (future: Date, past: Date): string => {
    const duration = new Date(future).getTime() - new Date(past).getTime();
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const hours1 = (hours < 10) ? "0" + hours : hours;
    const minutes1 = (minutes < 10) ? "0" + minutes : minutes;
    const seconds1 = (seconds < 10) ? "0" + seconds : seconds;
    return hours1 + ":" + minutes1 + ":" + seconds1
};

export const timeDifferenceNum = (future: number, past: number): string => {
    const duration = future - past;
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const hours1 = (hours < 10) ? "0" + hours : hours;
    const minutes1 = (minutes < 10) ? "0" + minutes : minutes;
    const seconds1 = (seconds < 10) ? "0" + seconds : seconds;
    return hours1 + ":" + minutes1 + ":" + seconds1
};

export const secondTillZero = (minute: number) => {
    const current_hours_in_milliseconds : number = Number(Date.now().toString().slice(-10));
    const mod = current_hours_in_milliseconds % (60000 * minute);
    const convert_to_seconds = mod / 1000;
    const second_to_zero = (minute * 60) - Math.trunc(convert_to_seconds);
    return second_to_zero
};

export const timeExpire = (future: Date | number, minute=0) => {
    const time = (new Date(future).getTime()+(minute*60*1000)) - Date.now();
    const calc_minutes = Math.round(time / 60 / 1000);
    return calc_minutes
};

export const readminutes = (minutes: number) => {
    if (minutes < 60) {
        return `${minutes}min`;
      } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (remainingMinutes === 0) {
          return `${hours}h`;
        } else {
          return `${hours}h ${remainingMinutes}min`;
        }
      }
}

export const nanoUk = (nanoseconds: number) => {
    // Convert to milliseconds by dividing by 1,000,000 (nanoseconds to milliseconds)
    const milliseconds = Number(nanoseconds) / 1e6;
    // Create a Date object from the converted timestamp
    return new Date(milliseconds).toLocaleString('en-US', {timeZone: "Europe/London"})
}