# Các phương sai của công ty A và B
D_R1 = 15  # Phương sai công ty A (%)
D_R2 = 20  # Phương sai công ty B (%)

# Tìm giá trị x tối thiểu hóa phương sai tổng hợp
# D_portfolio = x^2 * D_R1 + (1 - x)^2 * D_R2
from sympy import symbols, diff, solve

x = symbols('x')
D_portfolio = x**2 * D_R1 + (1 - x)**2 * D_R2

# Đạo hàm của D_portfolio theo x
dD_portfolio_dx = diff(D_portfolio, x)

# Giải phương trình đạo hàm bằng 0 để tìm x
solution = solve(dD_portfolio_dx, x)

# Hiển thị kết quả
x_optimal = solution[0]
percentage_A = x_optimal * 100
percentage_B = (1 - x_optimal) * 100

print(f"Tỷ lệ tối ưu để phân bổ vốn là: {percentage_A:.2f}% vào công ty A và {percentage_B:.2f}% vào công ty B")
