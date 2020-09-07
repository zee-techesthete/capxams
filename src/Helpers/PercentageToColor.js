export default function PercentageToColor(percentage) {
  let value = 100 - Math.abs(100 - percentage)

  if (value <= 39) {
    return '#FF3366'
  } else if (value >= 40 && value <= 59) {
    return '#FF6633'
  } else if (value >= 60 && value <= 79) {
    return '#C2D500'
  } else if (value >= 80) {
    return '#2AD03D'
  }
}
