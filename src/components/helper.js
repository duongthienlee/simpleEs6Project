export const convertTempMode = (isCelcius, temp) => {
    let fahrenheit = Math.floor(((temp * 9 / 5) + 32) * 10) / 10
    return isCelcius ? `${Math.floor(temp * 10) / 10} °C` : `${fahrenheit} °F`
}