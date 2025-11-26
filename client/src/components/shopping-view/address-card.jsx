import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '../ui/button';

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  return (
    <Card
      onClick={() => {
        console.log('Clicked address:', addressInfo); // <- Tambahkan ini untuk debug
        setCurrentSelectedAddress(addressInfo); // Pastikan ini dipanggil
      }}
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? 'border-red-900 border-[4px]'
          : 'border-black'
      }`}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>{addressInfo?.address}</Label>
        <Label>{addressInfo?.city}</Label>
        <Label>{addressInfo?.pincode}</Label>
        <Label>{addressInfo?.phone}</Label>
        <Label>{addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex - justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
