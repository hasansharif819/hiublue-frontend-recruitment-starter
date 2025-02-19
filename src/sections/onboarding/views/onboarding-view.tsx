"use client";

import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface FormData {
  planType: string;
  refundable: boolean;
  onDemand: boolean;
  negotiable: boolean;
  price: number;
}

const OnboardingView: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      planType: "pay-as-you-go",
      refundable: false,
      onDemand: false,
      negotiable: false,
      price: 0,
    },
  });

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<
    "success" | "error"
  >("success");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://dummy-1.hiublue.com/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("response ===>", response);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://dummy-1.hiublue.com/api/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit offer");
      }

      const result = await response.json();
      console.log("API Response:", result);

      // Show success message
      setSnackbarMessage("Offer submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error submitting offer:", error);

      // Show error message
      setSnackbarMessage("Failed to submit offer. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: "0 auto" }}>
      <Stack
        direction="column"
        borderBottom={1}
        borderColor="#E0E0E0"
        pb={3}
        mb={3}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Create Offer
        </Typography>
        <Typography variant="body1" color="#637381">
          Send onboarding offer to new user
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Plan Type */}
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel
            component="legend"
            sx={{ fontWeight: "bold", mb: 1, color: "#1C252E" }}
          >
            Plan Type
          </FormLabel>
          <Controller
            name="planType"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                sx={{ display: "flex", flexDirection: "row", color: "#1C252E" }}
              >
                <FormControlLabel
                  value="pay-as-you-go"
                  control={<Radio />}
                  label="Pay As You Go"
                />
                <FormControlLabel
                  value="monthly"
                  control={<Radio />}
                  label="Monthly"
                />
                <FormControlLabel
                  value="yearly"
                  control={<Radio />}
                  label="Yearly"
                />
              </RadioGroup>
            )}
          />
        </FormControl>

        {/* Additions */}
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend" sx={{ fontWeight: "bold", mb: 1 }}>
            Additions
          </FormLabel>
          <Stack direction="row" spacing={2}>
            <Controller
              name="refundable"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Refundable"
                />
              )}
            />
            <Controller
              name="onDemand"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="On Demand"
                />
              )}
            />
            <Controller
              name="negotiable"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Negotiable"
                />
              )}
            />
          </Stack>
        </FormControl>

        {/* User Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
            User
          </Typography>
          <Typography variant="body1">Jason Momoa</Typography>
          <Typography variant="body2" color="textSecondary">
            Expired: 03 May 2023
          </Typography>
        </Box>

        {/* Price Input */}
        <Controller
          name="price"
          control={control}
          rules={{ required: "Price is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Price"
              type="number"
              fullWidth
              sx={{ mb: 3 }}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          )}
        />

        {/* Send Offer Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#1C252E", color: "#fff" }}
        >
          Send Offer
        </Button>
      </form>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OnboardingView;
