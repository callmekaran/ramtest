export const ErrorDisplay = ({ name, errors, touched }) => {
  return errors[name] && touched[name] ? (
    <div
      className="error-message"
      style={{ color: "#dc3545", fontSize: "0.875rem", marginTop: "0.25rem" }}
    >
      {errors[name]}
    </div>
  ) : null;
};

export const getFieldClassName = (name, errors, touched) => {
  return errors[name] && touched[name]
    ? "is-invalid"
    : touched[name] && !errors[name]
    ? "is-valid"
    : "";
};

export const fileToBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => callback(reader.result);
  reader.onerror = (error) => console.log("Error: ", error);
};

export const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}`;
}

const padToTwoDigits = (num) => {
  return num.toString().padStart(2, "0");
}