import axiosInstance from "../utils/axiosUtil";
import {
  setProperties,
  setProperty,
  setSellerProperties,
} from "./propertySlice";

export const getAllProperties = async (
  dispatch,
  setLoading,
  curPage,
  resultPerPage,
  searchQuery_1,
  searchQuery_2,
  searchInput_3,
  searchInput_4
) => {
  try {
    setLoading(true);

    const { data } = await axiosInstance.get(
      `/api/property/get-all-properties?city=${searchQuery_1}&state=${searchQuery_2}&pincode=${searchInput_3}&totalRooms=${searchInput_4}&currentPage=${curPage}&resultPerPage=${resultPerPage}`
    );

    if (data.success) {
      setLoading(false);
      dispatch(setProperties({ properties: data.properties }));
    }
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};

export const getAllSellerProperties = async (setLoading, dispatch, token) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(
      "/api/property/get-all-seller-properties",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setLoading(false);
      dispatch(
        setSellerProperties({ sellerProperties: data.sellerProperties })
      );
    }
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};

export const getProperty = async (dispatch, token, id) => {
  try {
    const { data } = await axiosInstance.get(
      `/api/property/get-property/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      dispatch(setProperty({ property: data.property }));
    }
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};
