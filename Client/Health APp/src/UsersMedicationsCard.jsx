import React from 'react';
import { Card, Image, Text, Button } from '@mantine/core';

const UsersMedicationsCard = (props) => {

  return (
    <Card
      shadow="sm"
      p="xl"
      component="a"
      // href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      // add an API link to info about the med
      target="_blank"
    >
      <Card.Section>
        <Image
          src="https://media.istockphoto.com/id/1199906477/vector/image-unavailable-icon.jpg?s=170667a&w=0&k=20&c=QRaXTJuDrWe8Mwi-w98RHoy8-TSdbFPaYFeyUqLidds="
          height={160}
          alt="No way!"
        />
      </Card.Section>

      <Text weight={500} size="lg" mt="md">
        {props.medicine.name}
      </Text>

      <Text mt="xs" color="dimmed" size="sm">
        {props.mediction.time}
      </Text>
      <Button variant="outline" >DELETE</Button>
    </Card>
  )
}

export default UsersMedicationsCard;