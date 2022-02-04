export const openWithApple = ({
  latitude,
  longitude,
}: {
  latitude?: number | null;
  longitude?: number | null;
}) =>
  window.open("https://maps.apple.com/maps?q=" + latitude + "," + longitude);

export const openWithGoogle = ({
  latitude,
  longitude,
  id,
}: {
  latitude?: number | null;
  longitude?: number | null;
  id?: string | null;
}) => {
  if (id) {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=" +
        latitude +
        "," +
        longitude +
        "&query_place_id=" +
        id
    );
  } else {
    window.open("https://maps.google.com?q=" + latitude + "," + longitude);
  }
};
