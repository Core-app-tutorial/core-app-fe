export interface BreadcrumbSegment {
  label: string;
  href: string;
  isLast: boolean;
}

// Kiểm tra xem segment có phải là ID không
function isId(segment: string): boolean {
  // Kiểm tra UUID pattern
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  // Kiểm tra số nguyên
  const isNumber = /^\d+$/.test(segment);

  // Kiểm tra ObjectId MongoDB pattern
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;

  return uuidPattern.test(segment) || isNumber || objectIdPattern.test(segment);
}

// Kiểm tra xem segment có phải là action không
function isAction(segment: string): boolean {
  const actions = ["create", "update", "edit", "delete", "new"];
  return actions.includes(segment.toLowerCase());
}

// Chuyển đổi segment thành label hiển thị
function segmentToLabel(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Tạo breadcrumb segments từ pathname
export function createBreadcrumbSegments(
  pathname: string
): BreadcrumbSegment[] {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbSegments: BreadcrumbSegment[] = [];

  // Luôn thêm segment "Core" ở đầu
  breadcrumbSegments.push({
    label: "Core",
    href: "/",
    isLast: false,
  });

  let currentPath = "";

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    currentPath += `/${segment}`;

    // Bỏ qua ID và actions
    if (isId(segment) || isAction(segment)) {
      continue;
    }

    // Kiểm tra segment tiếp theo để quyết định có thêm vào breadcrumb không
    const nextSegment = segments[i + 1];
    const shouldInclude = true;
    let href = currentPath;

    // Nếu segment tiếp theo là ID hoặc action, điều chỉnh href
    if (nextSegment && (isId(nextSegment) || isAction(nextSegment))) {
      // Nếu segment tiếp theo là action, giữ nguyên href
      // Nếu segment tiếp theo là ID, href sẽ là đường dẫn hiện tại
      if (isId(nextSegment)) {
        // Tìm segment sau ID để xem có phải là action không
        const segmentAfterNext = segments[i + 2];
        if (segmentAfterNext && isAction(segmentAfterNext)) {
          // Nếu có action sau ID, href chỉ đến trước ID
          href = currentPath;
        }
      }
    }

    if (shouldInclude) {
      breadcrumbSegments.push({
        label: segmentToLabel(segment),
        href: href,
        isLast: false,
      });
    }
  }

  // Xử lý segment cuối cùng
  if (breadcrumbSegments.length > 0) {
    const lastSegment = segments[segments.length - 1];

    if (isAction(lastSegment)) {
      breadcrumbSegments.push({
        label: segmentToLabel(lastSegment),
        href: "",
        isLast: true,
      });
    } else if (isId(lastSegment)) {
      // Nếu kết thúc bằng ID, thêm "Detail" hoặc tên phù hợp
      breadcrumbSegments.push({
        label: "Detail",
        href: "",
        isLast: true,
      });
    }

    // Đánh dấu segment cuối cùng
    if (breadcrumbSegments.length > 0) {
      breadcrumbSegments[breadcrumbSegments.length - 1].isLast = true;
    }
  }

  return breadcrumbSegments;
}
