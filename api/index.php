<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();
$method = $_SERVER['REQUEST_METHOD'];


switch($method)

{
    
    case "GET":
        
        $sql = "SELECT * FROM products";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $products = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
            
        echo json_encode($products);
       
    break;  
    case "POST":
        
        
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        
        if(isset($data->type) and $data->type == "delete") {
            
            
            $sql = "DELETE FROM products WHERE id = :id";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[2]);

            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
        
        echo json_encode($response);
        
        
        
        
        } else {
            
            
            $product = json_decode( file_get_contents('php://input') );
            $sql = "INSERT INTO products(id, type_id, sku, name, size, weight, height, width, length, price, description) 
            VALUES (:id, :type_id, :sku, :name,  :size, :weight, :height, :width, :length, :price, :description)";
        
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $product->id);
            $stmt->bindParam(':type_id', $product->type_id);
            $stmt->bindParam(':sku', $product->sku);
            $stmt->bindParam(':name', $product->name);
            $stmt->bindParam(':size', $product->size);  
            $stmt->bindParam(':weight', $product->weight);
            $stmt->bindParam(':height', $product->height);
            $stmt->bindParam(':width', $product->width);
            $stmt->bindParam(':length', $product->length);      
            $stmt->bindParam(':price', $product->price);
            $stmt->bindParam(':description', $product->description);
 
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
    
            }
        
        echo json_encode($response);
        }
        
        
        

        
       
        
    break;
    

};