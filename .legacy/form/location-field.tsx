import { OnChangeParams, Select, TYPE } from "baseui/select";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStyletron } from "styletron-react";
import Button, { ButtonAppearance } from "../button/button";
import ListItem from "../list-item/list-item";
import LogoLoader from "../loader/logo";
import Maps, { Annotations } from "../maps";
import { useMap } from "../maps/mapkit-provider";
import { border, borderRadius, margin } from "../utils/css";
import useGeocode from "../utils/geocoder";
import { useLanguage } from "../utils/language";
import CheckboxField from "./checkbox-field";
import Field, { FieldProps } from "./field";

async function placesAround(lat: number, lng: number) {
  const response = await fetch(`/api/places/${lat}/${lng}`);
  const result = await response.json();
  return result;
}

export type LocationFieldProps = {
  showPlaces?: boolean;
  showMap?: boolean;
  name: string;
  error?: string | ReactNode;
  placeholder?: string;
  value?: {
    latitude?: number;
    longitude?: number;
    address?: string;
    googlePlaceId?: string;
  };
  setValue?: (v: {
    latitude: number;
    longitude: number;
    address?: string;
    radius?: number;
    googlePlaceId?: string;
  }) => void;
} & Omit<FieldProps, "error">;

type Place = {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  place_id: string;
  vicinity: string;
};

export default function LocationField(
  props: PropsWithChildren<LocationFieldProps>
) {
  const {
    name,
    label,
    caption,
    error,
    autoHide,
    value,
    setValue = () => {},
    ...input
  } = props;
  const [t] = useTranslation();
  const defaultOptions = [
    {
      id: 1,
      label: t("location-field.use-my-location"),
    },
  ];

  const [information, setInformation] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<any>(defaultOptions);
  const [selectedOption, setSelectedOption] = useState<any>(undefined);
  const [isLoading, setLoading] = useState(false);
  const { lang } = useLanguage();
  const { placeFromLocation, fromAddress } = useGeocode(lang);
  const [places, setPlaces] = useState<Place[] | undefined>(undefined);
  const [selectedValue, setSelectedValue] =
    useState<
      | {
          latitude: number;
          longitude: number;
          address: string;
        }
      | undefined
    >(undefined);
  const [selectedPlace, setSelectedPlace] =
    useState<Place | undefined>(undefined);
  const { map, gMaps, isReady } = useMap();
  const [css] = useStyletron();

  useEffect(() => {
    if (map) {
      map.addEventListener("drag-end", async function (event) {
        const { latitude, longitude } = event.annotation.coordinate;
        setValue({ ...event.annotation.coordinate, address: "." });
        showPlacesAround(latitude, longitude);
        try {
          const result = await placeFromLocation({
            latitude,
            longitude,
          });
          const v = {
            id: result?.placeId,
            label: result?.formattedAddress,
          };

          setValue({
            ...event.annotation.coordinate,
            address: result?.formattedAddress,
          });
          setSelectedValue({
            ...event.annotation.coordinate,
            address: result?.formattedAddress || "",
          });
          setSearch([
            ...defaultOptions,
            {
              ...v,
              location: result?.geometry.location,
            },
          ]);
          setSelectedOption([
            {
              ...v,
              isCreatable: true,
            },
          ]);
        } catch (e) {
          console.log(e);
        }
      });
    }
  }, [map]);

  if (!isReady) {
    return <LogoLoader relative />;
  }

  async function showPlacesAround(lat: number, lng: number) {
    if (props.showPlaces) {
      const response = await placesAround(lat, lng);
      setPlaces(response.results);
    }
  }

  async function useMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          showPlacesAround(latitude, longitude);
          setValue({ latitude, longitude });
          const result = await placeFromLocation({
            latitude,
            longitude,
          });

          const v = {
            id: result?.placeId,
            label: result?.formattedAddress,
          };

          setValue({
            latitude,
            longitude,
            address: result?.formattedAddress,
          });

          setSelectedValue({
            latitude,
            longitude,
            address: result?.formattedAddress || "",
          });
          setSearch([
            ...defaultOptions,
            {
              ...v,
              location: result?.geometry.location,
            },
          ]);
          setSelectedOption([
            {
              ...v,
              isCreatable: true,
            },
          ]);
        }
      );
    } else {
      setInformation("Geolocation is not supported by this browser.");
    }
  }

  async function onChange({ option, value: selectValue }: OnChangeParams) {
    setSelectedOption(selectValue);
    setLoading(true);

    if (option?.id === 1) {
      if (navigator.geolocation) {
        await new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
              showPlacesAround(latitude, longitude);

              const result = await placeFromLocation({
                latitude,
                longitude,
              });

              const v = {
                id: result?.placeId,
                label: result?.formattedAddress,
              };

              setValue({
                latitude,
                longitude,
                address: result?.formattedAddress,
              });

              setSelectedValue({
                latitude,
                longitude,
                address: result?.formattedAddress || "",
              });
              setSearch([
                ...defaultOptions,
                {
                  ...v,
                  location: result?.geometry.location,
                },
              ]);
              setSelectedOption([
                {
                  ...v,
                  isCreatable: true,
                },
              ]);
              setLoading(false);
              resolve({ latitude, longitude });
            },
            () => {
              setLoading(false);
              resolve({});
            }
          );
        });
      } else {
        setLoading(false);
        setInformation("Geolocation is not supported by this browser.");
      }
    } else if (option?.isCreatable && option.id) {
      try {
        const result = await fromAddress(option.id.toString());
        const formatted = [
          {
            id: result?.placeId,
            label: result?.formattedAddress,
            location: result?.geometry.location,
          },
        ];
        if (result && result.placeId) {
          setSearch([...defaultOptions, ...formatted]);
          setSelectedOption([
            {
              ...value,
              id: result.placeId,
              label: result.formattedAddress,
            },
          ]);
          setValue({
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
            address: result.formattedAddress,
          });
          setSelectedValue({
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
            address: result.formattedAddress,
          });
          showPlacesAround(
            result.geometry.location.lat,
            result.geometry.location.lng
          );
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setSelectedOption([
          {
            id: "Not found",
            label: "Not found",
            isCreatable: true,
          },
        ]);
      }
    } else if (option?.label) {
      const result = await fromAddress(option.label.toString());
      if (result && result.placeId) {
        setSelectedOption([
          {
            ...value,
            id: result.placeId,
            label: result.formattedAddress,
          },
        ]);
        setValue({
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
          address: result.formattedAddress,
        });
        setSelectedValue({
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
          address: result.formattedAddress,
        });
        showPlacesAround(
          result.geometry.location.lat,
          result.geometry.location.lng
        );
      }
      // setLoading(false);
    }

    setLoading(false);
  }

  const isEmpty = !selectedOption || selectedOption.length === 0;

  const autocomplete = new gMaps.places.AutocompleteService();

  const placeholder = value?.address || props.placeholder;

  return (
    <>
      <Field error={error} label={label} caption={caption} autoHide={autoHide}>
        <Select
          openOnClick
          noResultsMsg={t("location-field.no-results")}
          error={!!error}
          isLoading={isLoading}
          clearable
          creatable
          options={search.map((s: any) => ({
            label: s.label,
            id: s.id,
          }))}
          onInputChange={(e: any) =>
            autocomplete.getPlacePredictions(
              { input: e.target.value },
              (result) => {
                if (result) {
                  setSearch([
                    ...defaultOptions,
                    ...result.map((item) => ({
                      id: item.description,
                      label: item.description,
                    })),
                  ]);
                }
              }
            )
          }
          value={isEmpty ? undefined : selectedOption}
          placeholder={isEmpty && (placeholder || "")}
          onChange={onChange}
          getOptionLabel={(option) =>
            option.option?.isCreatable
              ? t("location-field.search-keyword", {
                  value: option.option.label,
                })
              : option.option?.label
          }
          type={TYPE.search}
          overrides={{
            SingleValue: {
              style: {
                whiteSpace: "normal",
              },
            },
          }}
        />
      </Field>
      {props.showMap && (
        <>
          <div
            className={css({
              position: "relative",
              height: "400px",
              width: "100%",
              marginTop: "1rem",
            })}
          >
            <Maps
              latitude={value?.latitude || 49.71336}
              longitude={value?.longitude || 15.58302}
              latitudeDelta={0.01}
              longitudeDelta={0.01}
            >
              <Annotations
                annotations={[
                  {
                    key: `${value?.latitude},${value?.longitude}`,
                    latitude: value?.latitude || 49.71336,
                    longitude: value?.longitude || 15.58302,
                    color: "#305f72",
                    draggable: true,
                  },
                  ...(selectedPlace
                    ? [
                        {
                          key: selectedPlace.place_id,
                          latitude: selectedPlace.geometry.location.lat,
                          longitude: selectedPlace.geometry.location.lng,
                        },
                      ]
                    : []),
                ]}
              />
            </Maps>
          </div>
          {props.showPlaces && places && places.length > 0 && (
            <div
              className={css({
                ...margin("1rem 0"),
                ...border({
                  style: "solid",
                  width: "2px",
                  color: "var(--border-color)",
                }),
                ...borderRadius("1rem"),
                maxHeight: "320px",
                overflow: "auto",
              })}
            >
              <h2
                className={css({
                  textAlign: "center",
                  color: "var(--font-light-gray)",
                  ...margin("1rem 0"),
                })}
              >
                {t("form.location-field.nearby")}
              </h2>
              <ListItem
                endEnhancer={
                  <div
                    className={css({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    })}
                  >
                    <CheckboxField
                      value={!value?.googlePlaceId}
                      onChange={() => {
                        selectedValue &&
                          setValue({
                            latitude: selectedValue?.latitude,
                            longitude: selectedValue?.longitude,
                            address: selectedValue?.address,
                            googlePlaceId: undefined,
                          });
                      }}
                      name="checkbox"
                    />
                  </div>
                }
                sublist
              >
                {selectedValue?.address}
              </ListItem>
              {places.map((place) => (
                <ListItem
                  description={place.vicinity}
                  endEnhancer={
                    <div
                      className={css({
                        display: "flex",
                        alignItems: "center",
                      })}
                    >
                      {/* <Button
                        style={{ marginRight: "0.5rem", height: "2rem" }}
                        appearance={
                          selectedPlace?.place_id === place.place_id
                            ? "secondary"
                            : "outline"
                        }
                        onClick={() =>
                          setSelectedPlace(
                            selectedPlace?.place_id === place.place_id
                              ? undefined
                              : place
                          )
                        }
                        icon={<Icons.MapPin size={14} />}
                      >
                        {t("form.location-field.show-on-map")}
                      </Button> */}
                      <CheckboxField
                        autoHide
                        value={value?.googlePlaceId === place.place_id}
                        onChange={() => {
                          if (value?.googlePlaceId === place.place_id) {
                            selectedValue &&
                              setValue({
                                ...selectedValue,
                                googlePlaceId: undefined,
                              });
                          } else {
                            setValue({
                              latitude: place.geometry.location.lat,
                              longitude: place.geometry.location.lng,
                              address: place.vicinity,
                              googlePlaceId: place.place_id,
                            });
                          }
                        }}
                        name="checkbox"
                      />
                    </div>
                  }
                >
                  {place.name}
                </ListItem>
              ))}
            </div>
          )}
          {/* 
          ({
                    key: place.place_id,
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                    title: place.name,
                    color: "#f1d1b5",
                    clusteringIdentifier: place.place_id,
                  }) */}
          <div>
            {information && t(information)}
            {!information && props.children && (
              <Button
                type="button"
                onClick={useMyLocation}
                appearance={ButtonAppearance.secondary}
                style={{ width: "100%", marginTop: "1rem" }}
              >
                {props.children}
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
}
