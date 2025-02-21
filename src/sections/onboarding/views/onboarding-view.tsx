"use client";

import React, { useState } from "react";
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
  Autocomplete,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import DatePickerComponent from "@/components/InputFields/DatePicker";
import { FormData, User } from "@/types/common";
import useSWR from "swr";
import { fetcher } from "@/utils";
import { toast } from "sonner";

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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const { data } = useSWR(`/users`, fetcher);

  const users = data?.data || [];

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
        toast.error("Failed to submit offer");
      }

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
    <Box
      sx={{
        padding: 3,
        maxWidth: 720,
        height: "100%",
        margin: "0 auto",
        gap: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
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
          <FormLabel
            component="legend"
            sx={{ fontWeight: "bold", mb: 1, color: "#1C252E" }}
          >
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
          <Stack spacing={2}>
            <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
              User
            </Typography>
            <Autocomplete
              disablePortal
              options={users}
              getOptionLabel={(user: User) => user?.name || ""}
              sx={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="Users" />}
            />
          </Stack>
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Typography
              variant="body1"
              color="1C252E"
              sx={{ fontWeight: "bold", mt: 5 }}
            >
              Expired
            </Typography>
            <DatePickerComponent />
          </Stack>
        </Box>

        {/* Price Input */}
        <Stack>
          <Typography
            variant="body1"
            color="1C252E"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Price
          </Typography>
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
        </Stack>

        {/* Send Offer Button */}
        <Stack direction="row" justifyContent="flex-end" sx={{ width: "100%" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1C252E",
              color: "#fff",
              padding: "10px 20px",
            }}
          >
            Send Offer
          </Button>
        </Stack>
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
