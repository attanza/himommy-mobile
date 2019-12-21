import React, { useContext, useEffect, useState } from "react";
import { Image } from "react-native";
import { Box, Text } from "react-native-design-utility";
import { useParams } from "react-router-dom";
import TocologistsApi from "../../apis/TocologistsApi";
import Appbar from "../../components/commons/Appbar";
import Loader2 from "../../components/commons/Loader2";
import Ratings from "../../components/commons/Ratings";
import RoundButton from "../../components/commons/RoundButton";
import SimpleTable from "../../components/commons/SimpleTable";
import TocologistServicesList from "../../components/user/TocologistServicesList";
import { useIsAuth, useIsMounted } from "../../hooks";
import {
  getDetail,
  getServices
} from "../../components/user/util/tocologistDetailData";
import { TocologistContext } from "../../contexts/tocologistContext";
import { theme } from "../../utils/theme";
import catchError from "../../helpers/catchError";

const TocologistDetail = props => {
  const isMounted = useIsMounted();
  useIsAuth();
  const [isFetching, setIsFetching] = useState(true);
  const { tocologist, setTocologist } = useContext(TocologistContext);

  const { id } = useParams();

  const getTocologist = async () => {
    try {
      const response = await TocologistsApi.get(id);
      setTocologist(response.data);
      setIsFetching(false);
    } catch (e) {
      catchError(e);
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      getTocologist();
    }
  }, []);

  if (isFetching) {
    return <Loader2></Loader2>;
  }

  return (
    <>
      <Appbar title="PROFIL BIDAN" link="/user/tocologists"></Appbar>
      {!tocologist ? (
        <Box f={1} center>
          <Text>Bidan tidak ditemukan</Text>
        </Box>
      ) : (
        <>
          <Box f={0.9}>
            <Box center mt="sm">
              <Box avatar circle={90}>
                <Image source={{ uri: tocologist.avatar }}></Image>
              </Box>
            </Box>
            <Ratings></Ratings>
            <Box center mt="sm">
              <Text weight="bold">{tocologist.name}</Text>
            </Box>

            <Box px="lg" mt="md">
              <SimpleTable
                data={getDetail(tocologist)}
                title="Data Bidan"
              ></SimpleTable>
            </Box>

            <Box px="lg" mt="md">
              <TocologistServicesList
                services={getServices(tocologist)}
              ></TocologistServicesList>
            </Box>
          </Box>
          <Box f={0.1}>
            <RoundButton
              onPress={() =>
                props.history.push(
                  `/user/tocologists/${tocologist.uid}/reservation`
                )
              }
              color={theme.color.purple}
              text="Reservasi"
              textSize="md"
            ></RoundButton>
          </Box>
        </>
      )}
    </>
  );
};

export default TocologistDetail;
