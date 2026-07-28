import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "65vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div>
        <Empty
          styles={{
            image: { height: 200 },
          }}
          description={
            <>
              <h2 style={{ marginBottom: 8, color: "#425463" }}>
                No saved products yet
              </h2>
              <p style={{ color: "#425463" }}>
                Save items you like to see them here
              </p>
            </>
          }
        />

        <Button
          type="primary"
          size="large"
          style={{ marginTop: 16 }}
          onClick={() => navigate("/")}
        >
          Browse products
        </Button>
      </div>
    </div>
  );
};

export { EmptyCart };
