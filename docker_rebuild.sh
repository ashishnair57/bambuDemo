docker-compose down
docker-compose up -d
echo "waiting 30s for docker to finish..."
sleep 30s
docker-compose exec db mysql -u root -ppassword bambu -e "source /docker-entrypoint-initdb.d/init.sql"
echo "Setup completed successfully..."