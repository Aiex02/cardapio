export const applyMask = (value: string, mask: string): string => {
    let maskedValue = "";
    let maskIndex = 0;
    let valueIndex = 0;
  
    while (maskIndex < mask.length && valueIndex < value.length) {
      if (mask[maskIndex] === "9") {
        maskedValue += value[valueIndex];
        valueIndex++;
      } else {
        maskedValue += mask[maskIndex];
      }
      maskIndex++;
    }
  
    return maskedValue;
  };
  
  export const cpfMask = (value: string): string => {
    return applyMask(value.replace(/\D/g, ""), "999.999.999-99");
  };
  
  export const telefoneMask = (value: string): string => {
    return applyMask(value.replace(/\D/g, ""), "(99) 99999-9999");
  };
  