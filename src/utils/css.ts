export function margin(m: string) {
  if (!m) {
    return undefined;
  }

  const [top, right, bottom, left] = m.split(" ");
  return {
    marginTop: top,
    marginRight: right || top,
    marginBottom: bottom || top,
    marginLeft: left || right || top,
  };
}

export function padding(m?: string) {
  if (!m) {
    return undefined;
  }
  const [top, right, bottom, left] = m.split(" ");
  return {
    paddingTop: top,
    paddingRight: right || top,
    paddingBottom: bottom || top,
    paddingLeft: left || right || top,
  };
}

export function borderRadius(m: string) {
  const [top, right, bottom, left] = m.split(" ");
  return {
    borderTopLeftRadius: top,
    borderTopRightRadius: right || top,
    borderBottomRightRadius: bottom || top,
    borderBottomLeftRadius: left || right || top,
  };
}

export function border(m?: {
  color: string;
  style: string;
  width: string;
}): any {
  if (!m) {
    return {
      borderTopWidth: "0",
      borderRightWidth: "0",
      borderBottomWidth: "0",
      borderLeftWidth: "0",
    };
  }

  return {
    borderTopStyle: m.style,
    borderTopWidth: m.width,
    borderTopColor: m.color,
    borderRightStyle: m.style,
    borderRightWidth: m.width,
    borderRightColor: m.color,
    borderBottomStyle: m.style,
    borderBottomWidth: m.width,
    borderBottomColor: m.color,
    borderLeftStyle: m.style,
    borderLeftWidth: m.width,
    borderLeftColor: m.color,
  };
}

export function borderColor(m: string) {
  return {
    borderTopColor: m,
    borderRightColor: m,
    borderBottomColor: m,
    borderLeftColor: m,
  };
}
