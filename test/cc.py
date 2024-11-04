import binascii

packet = "My".encode("utf-8")
checksum = binascii.crc32(packet)
print(f"CRC-32 Checksum: {checksum}")
