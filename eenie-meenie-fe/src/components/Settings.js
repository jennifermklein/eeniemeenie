import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../util/axios";

import {
  Box,
  Button,
  Divider,
  Stack,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Spinner,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Radio,
  RadioGroup,
  RangeSlider,
  RangeSliderMark,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

const Settings = () => {
  const navigate = useNavigate();

  const [fetching, setFetching] = useState(true);
  const [year, setYear] = useState("1985");
  const [gender, setGender] = useState("F");
  const [popularityRange, setPopularityRange] = useState([70, 100]);

  const setSettings = (settings) => {
    if (settings.year) {
      setYear(settings.year);
    }
    if (settings.gender) {
      setGender(settings.gender);
    }
    if (
      settings.min_popularity_percent != null &&
      settings.max_popularity_percent != null
    ) {
      setPopularityRange([
        settings.min_popularity_percent,
        settings.max_popularity_percent,
      ]);
    }
  };

  // get existing settings on load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get(`/settings`);
        setSettings(data);
      } catch (error) {
        console.log(error);
      }
      setFetching(false);
    };

    fetchSettings();
  }, []);

  // submit new settings
  const submit = async () => {
    try {
      await axios.post(`/settings`, {
        year,
        gender,
        min_popularity_percent: popularityRange[0],
        max_popularity_percent: popularityRange[1],
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (fetching) {
    return <Spinner />;
  }

  return (
    <Stack
      spacing={[2, 8]}
      mx={"auto"}
      minW={["xs", "sm", "md", "lg"]}
      py={[3, 12]}
      px={[3, 6]}
    >
      <Stack align={"center"}>
        <Heading fontSize={["2xl", "4xl"]} textAlign={"center"}>
          Enter settings
        </Heading>
      </Stack>
      <Box rounded={"lg"} bg={"whiteAlpha.900"} boxShadow={"lg"} p={8}>
        <Stack spacing={[2, 8]}>
          <Heading fontSize={["xl", "2xl"]} textAlign={"center"}>
            Show me...
          </Heading>
          <FormControl id="year">
            <FormLabel mb={6}>Names popular in</FormLabel>
            <Slider
              aria-label="year"
              colorScheme="orange"
              min={1880}
              max={2021}
              value={year}
              onChange={(val) => setYear(val)}
            >
              <SliderMark
                value={year}
                fontSize={"sm"}
                textAlign="center"
                mt="-7"
                ml="-4"
              >
                {year}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>

          <Divider />

          <FormControl id="gender">
            <FormLabel mb={6}>...usually given to:</FormLabel>
            <RadioGroup onChange={(val) => setGender(val)} value={gender}>
              <Flex direction="row" justifyContent={"space-evenly"}>
                <Radio value="M" colorScheme="blue">
                  Boys
                </Radio>
                <Radio value="F" colorScheme="pink">
                  Girls
                </Radio>
                {/* <Radio value="N" colorScheme="green">
                  Anyone
                </Radio> */}
              </Flex>
            </RadioGroup>
          </FormControl>

          <Divider />

          <FormControl id="popularity">
            <FormLabel mb={8}>...with popularity:</FormLabel>
            <RangeSlider
              aria-label={"popularity range"}
              colorScheme="yellow"
              defaultValue={popularityRange}
              min={0}
              max={100}
              onChange={(val) => setPopularityRange(val)}
            >
              <RangeSliderMark
                value={popularityRange[0]}
                fontSize={"sm"}
                textAlign="center"
                mt="-7"
                ml="-2"
              >
                {popularityRange[0]}%
              </RangeSliderMark>
              <RangeSliderMark
                value={popularityRange[1]}
                fontSize={"sm"}
                textAlign="center"
                mt="-7"
                ml="-2"
              >
                {popularityRange[1]}%
              </RangeSliderMark>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
          </FormControl>

          <Button
            loadingText="Submitting"
            colorScheme="purple"
            onClick={submit}
          >
            Save settings
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Settings;
