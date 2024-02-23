import React, { useState } from "react";
import { Box, Button, VStack, HStack, useColorModeValue } from "@chakra-ui/react";
import { FaSearchPlus, FaSearchMinus } from "react-icons/fa";

const generateColor = (depth) => {
  let color = `hsl(${(depth * 36) % 360}, 100%, 50%)`;
  return color;
};

const FractalBox = ({ depth }) => {
  if (depth === 0) {
    return null;
  }
  const color = generateColor(depth);
  return (
    <Box w="100%" h="100%" bg={color} display="flex" alignItems="center" justifyContent="center">
      <FractalBox depth={depth - 1} />
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
        <FractalBox depth={fractalDepth} />
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
