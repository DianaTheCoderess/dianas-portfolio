import { TechStack } from "@/components/TechStack";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("TechStack", () => {
  const mockTechnologies = [
    "React",
    "TypeScript",
    "Node.js",
    "Java",
    "JavaScript",
    "Kubernetes",
  ];

  it("renders all technologies", () => {
    render(<TechStack technologies={mockTechnologies} />);
    for (const tech of mockTechnologies) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }
  });
});
