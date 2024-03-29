import React, { useState } from "react";
import { Box, Button, VStack, HStack, useColorModeValue } from "@chakra-ui/react";
import { FaSearchPlus, FaSearchMinus } from "react-icons/fa";

const generateColor = (depth) => {
  let color = `hsl(${(depth * 36) % 360}, 100%, 50%)`;
  return color;
};

const FractalBox = ({ size = "100%" }) => {
  const newSize = size.includes("%") ? `${parseInt(size) * 0.5}%` : size * 0.5;
  if (newSize.includes("%") ? parseInt(newSize) <= 1 : newSize <= 1) {
    return null;
  }
  const color = generateColor(parseInt(size));

  return (
    <Box w={size} h={size} bg={color} display="flex" alignItems="center" justifyContent="center">
      <FractalBox size={newSize} />
    </Box>
  );
};

const Index = () => {
  const [zoomLevel, setZoomLevel] = useState(5);

  const zoomIn = () => setZoomLevel((prev) => (prev < 10 ? prev + 1 : prev));
  const zoomOut = () => setZoomLevel((prev) => (prev > 0 ? prev - 1 : prev));

  const fractalDepth = useColorModeValue(zoomLevel, 10 - zoomLevel);

  return (
    <VStack spacing={4} p={8} align="stretch">
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} position="relative" h="400px">
        <FractalBox size={"100%"} />
      </Box>

      <HStack justifyContent="center">
        <Button leftIcon={<FaSearchMinus />} onClick={zoomOut} isDisabled={zoomLevel === 0}>
          Zoom Out
        </Button>
        <Button rightIcon={<FaSearchPlus />} onClick={zoomIn} isDisabled={zoomLevel === 10}>
          Zoom In
        </Button>
      </HStack>
    </VStack>
  );
};

export default Index;
