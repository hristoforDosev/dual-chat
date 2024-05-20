import { Avatar, Box, Stack, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { MessageType } from "./types";

export default function Message({ message }: { message: MessageType }) {
  return (
    <Box
      bgcolor={(theme) =>
        message.isMe ? theme.palette.info.light : theme.palette.grey.A200
      }
      color={(theme) =>
        message.isMe
          ? theme.palette.info.contrastText
          : theme.palette.text.primary
      }
      p={1}
      borderRadius={6}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
      >
        <Avatar>
          <PersonIcon />
        </Avatar>
        <Typography variant="body1">{message.text}</Typography>
      </Stack>
    </Box>
  );
}
